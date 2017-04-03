var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

// var parse = require('./parse.js')
var usfmValidate = require('./usfmValidate.js')

var input = './Tests/3JN.usfm';

var output = [];
var lines = [];
var count = 0;

var s = fs.createReadStream(input)
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
        count ++;
      
        //object element for each line
        var data = {} ;
        var dataArr = line.split("\\");
        dataArr = dataArr.splice(1, dataArr.length);

        // loop through each lines
        for(var i=0; i<dataArr.length; i++){
           
            //marker and values from each line
            data.marker = dataArr[0].split(" ")[0] ; 
           
            // check if values null after each marker
            // this works for lines which only contains a single marker with no text following eg: \p
            if(dataArr[0].split(/^[^ ]+ /)[1] !== undefined){
                data.value = dataArr[0].split(/^[^ ]+ /)[1]
            }
            else{
                data.value = "null";
            }
            if (data.marker == 'v'){
                data.number = dataArr[0].split(" ")[1]; 
                data.value = dataArr[0].split(/\d+ /)[1];
            }
            
            // handle inline markers as children of the corresponding line
            data.children = [];
            if(dataArr.length > 1){
                childArr = dataArr.slice(1);
                // console.log(childArr)
                
                //inline markers structure starts from here
                var obj = {};
                for (var j=0; j<childArr.length; j++) {
                    var inlineArr = childArr[j].split(" ");
                    // console.log(inlineArr[1])
                    
                    // object for inline markers
                    inlineMarker = childArr[j].split(" ")[0];
                    inlineValue = childArr[j].substr(childArr[j].indexOf(' ')+1);
                    
                    // null values if only marker exist
                    if(inlineArr[1] == "" || inlineValue.length == 1){
                        obj.marker = inlineMarker;
                        obj.value = "null";
                    }
                    else{
                        obj.marker = inlineMarker;
                        obj.value = inlineValue;
                    }
                    data.children.push(obj); 
                    // console.log(data.children)
                }

            }
            else{
                data.children = "null";
            }
            // count holds the line numbers in each line
            data.count = count;  
        }
        lines.push(data);
        // console.log(lines)
        // return lines;
    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        // output.push(lines)
        // console.log(lines)
        usfmValidate.Validate(lines)
        console.log('Read entire file.')
    })
);
module.exports = s;

// console.log(usfmValidate)
