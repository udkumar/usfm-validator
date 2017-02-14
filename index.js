var fs = require('fs');
var path = require('path')

var fileExtension = require('file-extension');

var usfm = require('usfm-parser');

var filePath = './Tests/1JN.usfm';

fs.readFile( filePath, 'utf8', function(err, data) {

if(data.match(/\\c/)){
	// console.log("yes")
}
	var ext = fileExtension(filePath);

	var toJSON = usfm.toJSON(data);
	var idTag = toJSON.headers.id;
	console.log(toJSON.headers['id'])

	if( ext == 'usfm' || ext == 'sfm'){	
	    
		var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;
	    // the three letter code in the \id field must be capitalized
	    // if (idTag.match(regEx)){
	    	// validateChapter();
	    // }
	    // else{
	    // 	console.log('\id tag is not fulfilled according to the usfm requirement');
	    // }
    }
	else {
        console.log(' Only usfm file is allowed');
    }

    if (err) {
    	console.log(err);
    }
   	
   	function validateChapter() {

		var bookData = toJSON.chapters;
		
		var chapterNum = [];
		for (var i in bookData) {
			chapterNum.push(bookData[i].number)
		
			var verses = bookData[i].verses;
			// console.log(verses)

			var verseNum = [];
			for(var i = 0; i < verses.length; i++) {
	          verseNum.push(verses[i].number);
	      	}
	      	var missing ;
	      	for(j=1; j<= verses.length-1; j++){
		          if(verseNum[j-1] != j){
		          	missing = j;
		          	// console.log(missing);
		          }
	      		}
      	}
		console.log(chapterNum);

	}

});



