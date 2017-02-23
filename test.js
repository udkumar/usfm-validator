var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var test;
var filePath = './Tests/3JN.usfm';

var s = fs.createReadStream(filePath)
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
        // console.log(line)


    })
 	.on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        console.log('Read entire file.')
    })
);

module.exports = test;
