var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var lines = [];
var count = 0;
var validator;

var s = fs.createReadStream('./Tests/3JN.usfm')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
        count ++;
        var errors = [];
        
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
            if(dataArr.length > 1){
                data.children = [];
                childArr = dataArr.slice(1)
                
                //object for inline markers
                var obj = {}
                childArr.forEach(function(value, index, array){
                    obj.marker = childArr[index].split(" ")[0] ;
                    obj.value = childArr[index].substr(childArr[index].indexOf(' ')+1)
                })
                data.children.push(obj);
            }
            else{
                data.children = "null";
            }
            // count holds the line numbers in each line
            data.count = count;    
        }
        lines.push(data);

    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(lines){

        /*  #Validation for Minimum USFM Requirements in given usfm file described here:
            https://git.door43.org/Door43/ContentTechs/wiki/Minimum-USFM-Requirements
            Validation Levels include

        */

        usfmValidate = function(){
            for (var i in lines) {
                if(lines[i].marker === 'id'){
                    var value = lines[i].value;
                    markerID = value.split(" ")[0];
                    count = lines[i].count;
                    // console.log(markerID)
                    var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;
                    if (markerID.match(regEx)){
                        console.log("The \\id marker of this usfm file is "+"'"+ markerID +"'"+" in line number "+ count)

                    }
                    else{
                        console.log("ID marker is not validated acc to minimum usfm requirement--->"+"'"+markerID+"'")
                    }
                }
            }
        }













        // chapter validations
        var chapNum = [];
        for(var i in lines){
            if (lines[i].marker === 'c') {
                chapNum.push(lines[i].value)
            }
        }
        
        //missing chapter number
        var missing;
        for(j=1; j <= chapNum.length; j++){
            if(chapNum[j-1]!= j){
                missing = j;
                // console.log( "The missing Chapter number is " + missing)
            }
        }

        console.log('Read entire file.')
    })
);

module.exports = validator;

