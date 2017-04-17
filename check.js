var validator = require('./validator.js');
var result = [];

var markerOccurOnce = ["id", "ide", "h", "toc1", "toc2", "toc3", "mt"],
		markerRepeating = ["p", "c", "v"];

var tag_id = 0;
var $;

require("jsdom").env("", function(err, window) {
  if (err) {
    console.error(err);
    return;
  }
  $ = require("jquery")(window);
  doSomething();
});

function doSomething(){
  var deferred = $.Deferred();
}

exports.findMarker = function(lines){
	test = [ { marker: 'ide', value: 'UTF-8', children: 'null', count: 1 }]

	testArray = 'ide' in test;

	for (var i = 0; i < lines.length; i++) {
		var marker = lines[i].marker;
		var line = lines[i];
		checkMarker(marker, line, lines);	
	}
}

var tag_id = 0,
	tag_ide = 0,
	tag_h = 0,
	tag_toc1 = 0,
	tag_toc2 = 0,
	tag_toc3 = 0,
	tag_mt = 0;

var invalid_id = false,
	invalid_ide = false,
	tag_h = false,
	invalid_toc1 = false,
	invalid_toc2 = false,
	invalid_toc3 = false,
	invalid_mt = false;

function checkMarker(marker, line, lines){
	console.log(lines);
	if((marker === 'id')){
		count = line.count;
		tag_id ++;
	}
	else if((tag_id == 2)){
		count = line.count;
		tag_id ++;
		invalid_id = true;
		console.log("id is available in multiple times");
	}
	else if($.inArray("id", lines) !== -1){
		console.log("hellooooo");
	}

	if((marker === 'ide')){
		count = line.count;
		tag_ide ++;
	}
	else if((tag_ide == 2)){
		count = line.count;
		tag_ide ++;
		invalid_ide = true;
		console.log("ide is available in multiple times");
	}else{

	}

	if((marker === 'h')){
		count = line.count;
		tag_h ++;
	}
	else if((tag_h == 2)){
		count = line.count;
		tag_h ++;
		invalid_h = true;
		console.log("h is available in multiple times");
	}else{
		
	}

	if((marker === 'tag_toc1')){
		count = line.count;
		tag_toc1 ++;
	}
	else if((tag_toc1 == 2)){
		count = line.count;
		tag_toc1 ++;
		invalid_toc1 = true;
		console.log("toc1 is available in multiple times");
	}else{
		
	}

	if((marker === 'tag_toc2')){
		count = line.count;
		tag_toc2 ++;
	}
	else if((tag_toc2 == 2)){
		count = line.count;
		tag_toc2 ++;
		invalid_toc2 = true;
		console.log("toc2 is available in multiple times");
	}else{
		
	}

	if((marker === 'tag_toc3')){
		count = line.count;
		tag_toc3 ++;
	}
	else if((tag_toc3 == 2)){
		count = line.count;
		tag_toc3 ++;
		invalid_toc3 = true;
		console.log("toc3 is available in multiple times");
	}else{
		
	}

	if((marker === 'mt')){
		count = line.count;
		tag_mt ++;
	}
	else if((tag_mt == 2)){
		count = line.count;
		tag_mt ++;
		invalid_mt = true;
		console.log("mt is available in multiple times");
	}else{
		
	}

	// if(($.inArray("ide", markerOccurOnce) !== -1 ) && (tag_ide == 0)){
	// 	count = line.count;
	// 	tag_ide ++;
	// }
	// else if((tag_ide == 1)){
	// 	count = line.count;
	// 	tag_ide ++;
	// 	console.log("ide is available in multiple times");
	// }
	// else if(tag_id == 0){
	// 	tag_id ++;
	// 	tag_id_marker = marker;
	// 	console.log(marker + "is not available");
	// }

	// if( ($.inArray("ide", markerOccurOnce) !== -1 ) && (tag_ide == 0)) {
	// 	tag_ide ++;
	//   console.log("found");
	// }
	// if( ($.inArray("h", markerOccurOnce) !== -1 ) && (tag_h == 0)) {
	// 	tag_h ++;
	//   console.log("found");
	// }
	// if( ($.inArray("toc1", markerOccurOnce) !== -1 ) && (tag_toc1 == 0)) {
	// 	tag_toc1 ++;
	//   console.log("found");
	// }
	// if( ($.inArray("toc2", markerOccurOnce) !== -1 ) && (tag_toc2 == 0)) {
	// 	tag_toc2 ++;
	//   console.log("found");
	// }
	// if( ($.inArray("toc3", markerOccurOnce) !== -1 ) && (tag_toc3 == 0)) {
	// 	tag_toc3 ++;
	//   console.log("found");
	// }


	// if((marker === 'id') && (tag_id == 0)){
 //   	var markerID = line.value.split(" ")[0];
 //   	count = line.count;
 //   	var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;

 //   	if (markerID.match(regEx)){
 //   		result.push("Info: The \\id marker "+ markerID +" found in line "+ count)
 //   	}else{
 //     	result.push("Warning: The \\id marker is not validated according to minimum usfm requirement--->"+"'"+markerID+"'");
 //     	result.push("The CODE is a standard 3 letter scripture book abbreviation found here:");
 //     	result.push("http://ubsicap.github.io/usfm/identification/books.html");
 //   	}
	// 	tag_id++;     	
	// }else if((marker === 'id') && (tag_id > 1)) {
 //     result.push("Error: The marker \\id is found repeating in line "+ count)
 // 	}else if((marker != 'id') && (tag_id == 0)) {
 // 		result.push("Error: The initial USFM marker in any scripture text file is \\id and it is not found");
 // 		tag_id++;
 // 	}

 	// if((marker === 'ide') && (tag_ide == 0)){
  //   var markerIde = line.value;
  //   count = line.count;
  //   var regEx = /(UTF-8|UTF-16|CP-1252|CP-1251)/;

  //   if(markerIde.match(regEx)){
  //     result.push("Info: The \\ide marker is "+"'"+ markerIde +"'"+" found in line "+ count);
  //   }
  //   else{
  //     result.push("Error: The \\ide marker should contain a character encoding specification in line "+ count)
  //   }
  //   tag_ide ++;
  // }else if((marker === 'ide') && (tag_ide > 0)){
  //  		result.push("Error: Marker ide is showing more than one times....in line " + line.count);
  // }else if((marker != 'ide') && (tag_ide == 0)){
  // 	result.push("\\ide marker is not found "+ line.count)
  // 	tag_ide ++;
  // }
}

