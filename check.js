var validator = require('./validator.js');

var result = [];

exports.findMarker = function(lines){
	for (var i = 0; i < lines.length; i++) {
		var marker = lines[i].marker;
		var line = lines[i];
		console.log(line)
		checkMarker(marker, line);
	}
	console.log(result)
}

var tag_id = 0;

function checkMarker(marker, line){
	if((marker === 'id') && (tag_id == 0)){
     	var markerID = line.value.split(" ")[0];
     	count = line.count;
     	var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;

     	if (markerID.match(regEx)){
       		result.push("Info: The \\id marker "+ markerID +" found in line "+ count)
     	}else{
	       	result.push("Warning: The \\id marker is not validated according to minimum usfm requirement--->"+"'"+markerID+"'");
	       	result.push("The CODE is a standard 3 letter scripture book abbreviation found here:");
	       	result.push("http://ubsicap.github.io/usfm/identification/books.html");
     	}
		tag_id++;     	
	}else if((marker === 'id') && (tag_id > 1)) {
     	result.push("Error: The marker \\id is found repeating in line "+ count)
   	}else if((marker != 'id') && (tag_id == 0)) {
   		result.push("Error: The initial USFM marker in any scripture text file is \\id and it is not found");
   		tag_id++;
   	}
   	// console.log(result)
}

