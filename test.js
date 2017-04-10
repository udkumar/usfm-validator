var validator = require('./validator.js');

var lines = validator.lines

console.log(validator)

// lines.forEach(isMarkerId)

// 	exports.isMarkerId = function(lines, i){
// 		if((lines[i].marker === 'id') && (tag_id == 0)){
// 		     	var markerID = lines[i].value.split(" ")[0];
// 		     	count = lines[i].count;
// 		     	var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;

// 		     	if (markerID.match(regEx)){
// 		       		console.log("Info: The \\id marker is "+"'"+ markerID +"'"+" found in line "+ count)

// 		     	}else{
// 			       	console.log("Warning: The \\id marker is not validated according to minimum usfm requirement--->"+"'"+markerID+"'");
// 			       	console.log("The CODE is a standard 3 letter scripture book abbreviation found here:");
// 			       	console.log("http://ubsicap.github.io/usfm/identification/books.html");
// 		     	}
// 		}else {
// 	     	console.log("Error: The initial USFM marker in any scripture text file is \\id and it is not found in line 1");
// 	     	// tag_id ++;
// 	   	}
// 	}


// exports.isEmail = function(input) {
//   if (!(input != null)) {
//     return false;
//   } else {
//     return input.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
//   }
// };