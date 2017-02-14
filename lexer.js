var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var lexer;
var lines = [];


var s = fs.createReadStream('./Tests/3JN.usfm')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        //object element for each line
        var data = {} ;
        var dataArr = line.split("\\");
        dataArr = dataArr.splice(1, dataArr.length);
        
        // loop through each lines
        for(var i=0; i<dataArr.length; i++){
            //marker and values from each line
            data.tag = dataArr[0].split(" ")[0] ; 
            // check if values null after each marker
            if(dataArr[0].split(/^[^ ]+ /)[1] !== undefined){
                data.value = dataArr[0].split(/^[^ ]+ /)[1]
            }
            else{
                data.value = "null";
            }
            if (data.tag == 'v'){
                data.number = dataArr[0].split(" ")[1]; 
                data.value = dataArr[0].split(/\d+ /)[1];
            }
            
            // handle inline markers as children of the corresponding line
            if(dataArr.length > 1){
                data.children = [];
                childArr = dataArr.slice(1)
                //object for inline markers
                var obj = {}
                childArr.forEach(function(value, index, array){
                    // marker and values from each inline tag
                    obj.tag = childArr[index].split(" ")[0] ;
                    obj.value = childArr[index].substr(childArr[index].indexOf(' ')+1)
                })
                data.children.push(obj);
                // console.log(obj)

            }
            else{
                data.children = "null";
            }    
                    
        }
        lines.push(data);

        
    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        // console.log(lines.data['id'])

        return lines;
        console.log('Read entire file.')
    })
);

module.exports = lexer;