var validator = require('./validator.js');

exports.findMarker = function(lines){	
	for (var i = 0; i < lines.length; i++) {
		var marker = lines[i].marker;
		var line = lines[i];
		var count = lines[i].count;
		var checker = getMarker(marker)
		console.log(checker +count)
	}
}

function getMarker(type){
	var fn;
	// console.log("checking here below")
	var markers = {
		'id' : function(){
			return 'id' ;
		}, 
		'ide': function(){
			return 'ide' ; 
		},
		'mt': function(){
			return 'mt' ;
		},
		'default': function(){
			return 'Not a minimum required marker';
		}
	};
	if(markers[type]){
		fn = markers[type];
	} else {
		fn = markers['default'];
	}
	return fn();
}