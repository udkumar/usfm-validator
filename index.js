var fs = require('fs');
var path = require('path')

var fileExtension = require('file-extension');

var usfm = require('usfm-parser');

var filePath = './Tests/3JN.usfm';

fs.readFile( filePath, 'utf8', function(err, data) {

	var ext = fileExtension(filePath);

	var toJSON = usfm.toJSON(data);
	var idTag = toJSON.headers['id'];

	if( ext == 'usfm' || ext == 'sfm'){	
	    
		var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;
	    // the three letter code in the \id field must be capitalized
	    if (idTag.match(regEx)){
	    	validateChapter();
	    }
	    else{
	    	console.log('\id tag is not fulfilled according to the usfm requirement');
	    }
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
		chapterNum = bookData[0].number;
		// console.log(chapterNum);
		var verses = bookData[0].verses;
		console.log(verses.length)

		var verseNum = [];
		for(var i = 0; i < verses.length; i++) {
          verseNum.push(verses[i].number);
      	}
      	console.log(verseNum);

      	var duplicateVerseNum = [];
      	for (var i = 0; i < verseNum.length - 1; i++) {
      		if (verseNum[i + 1] == verseNum[i]) {
        		duplicateVerseNum.push(verseNum[i]);
    		}
      	}
      	console.log(duplicateVerseNum);

      	var outs= [], L= verseNum.length, i= 0, prev;
		while(i<L){
    		prev= verseNum[i]; 
    		while(verseNum[++i]<prev) outs.push(i);
		}
		console.log(outs);
      	
	}

});



