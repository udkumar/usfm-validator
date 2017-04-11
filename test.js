var validator = require('./validator.js');

var lines = validator.lines

console.log(lines)


exports.isMarkerId = function(lines, i){
	if((lines[i].marker === 'id') && (tag_id == 0)){
	     	var markerID = lines[i].value.split(" ")[0];
	     	count = lines[i].count;
	     	var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;

	     	if (markerID.match(regEx)){
	       		console.log("Info: The \\id marker is "+"'"+ markerID +"'"+" found in line "+ count)

	     	}else{
		       	console.log("Warning: The \\id marker is not validated according to minimum usfm requirement--->"+"'"+markerID+"'");
		       	console.log("The CODE is a standard 3 letter scripture book abbreviation found here:");
		       	console.log("http://ubsicap.github.io/usfm/identification/books.html");
	     	}
	}else {
     	console.log("Error: The initial USFM marker in any scripture text file is \\id and it is not found in line 1");
   	}
}
