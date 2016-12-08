var fs = require('fs');
var path = require('path')

var fileExtension = require('file-extension');

var filePath = './Tests/3JN.usfm';

fs.readFile( filePath, 'utf8', function(err, data) {  

	console.log(filePath);
	function validateUsfm(usfmInput){

	var validateUsfmFileExtension =  [".sfm", ".usfm"];   
	fileExtension();

	}


    if (err) {
    	console.log(err);
    }
    // console.log(filepath);
});


