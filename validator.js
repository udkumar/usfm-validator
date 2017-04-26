var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream')
    , sutil = require('line-stream-util')
    , findInFiles = require('find-in-files')
    , JFile=require('jfile')
    , stringSearcher = require('string-search');

var usfmValidate = require('./usfmValidate.js')
var check = require('./check.js')

var input = './Tests/3JN.usfm';
// fs.readFile(input, function (err, data) {
//   if (err) throw err;
//   if(data.indexOf('\\id') >= 0){
//    console.log(data)
//   }
// });
// fs.createReadStream(input)
//   .pipe(sutil.split()) // split lines
//   .setEncoding('utf8')
//   .on('data', console.log)

// fs.readFile(input, function(err, cont) {
//     if (err)
//         throw err;
//     console.log("String"+(cont.indexOf("id")>-1 ? " " : " not ")+"found");
// });

// findInFiles.find("", input, '\\ide')
//     .then(function(results) {
//         for (var result in results) {
//             var res = results[result];
//             console.log(
//                 'found "' + res.matches[0] + '" ' + res.count
//                 + ' times in "' + result + '"'
//             );
//         }
//     });

// var txtFile=new JFile(input);
// var result=txtFile.grep("id");
// console.log(result);

stringSearcher.find("\\id MAT Unlocked Literal Bible, Literal", 'Literal')
  .then(function(resultArr) {
    console.log(resultArr);
    //resultArr => [ {line: 1, text: 'This is the string to search text in'} ] 
  });
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
    // if the line is not empty
    if(dataArr.length != 0){
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
        //inline markers structure starts from here
        for (var j = 0; j < childArr.length; j++) {
          let split = childArr[j].split(" ");
          // object for inline markers
          // ternary operator handles if only markers exist with out any values
          data.children.push({
            marker: split[0],
            value: ((split[1] == "" ||split[1] == undefined) ? "null" : split.slice(1).join(" "))
          });
        }
      }
      else{
        data.children = "null";
      }
      // count holds the line numbers in each line
      data.count = count;
      lines.push(data);  
    }
  })
  .on('error', function(){
    console.log('Error while reading file.');
  })
  .on('end', function(){
    // usfmValidate.Validate(lines)
    check.findMarker(lines)
  })
);

module.exports = s;

