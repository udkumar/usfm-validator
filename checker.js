var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var lines = [];

var s = fs.createReadStream('./Tests/3JN.usfm')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        //object element for each line
        var data = {} ;
        
        var dataArr = line.split(/[\\]+/);
        dataArr = dataArr.splice(1, dataArr.length);
        
        for(var i=0; i<dataArr.length; i++){

            //marker and values from each lines
            data.tag = dataArr[i].split(" ")[0] ;
            data.value = dataArr[0].substr(dataArr[0].indexOf(' ')+1)
            
        }

        lines.push(data);
        
    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);