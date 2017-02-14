exports.isEmpty = function (line) {
	if (!(line != null)) {
		return false;
	} else {
		return true;
	}
}

exports.isId = function (line) {
	if (!(line != null)) {
		return false;
	} else {
		return line.match("\\id");
	}
}

exports.isIde = function(line){
	if(!(line != null)) {
		return false;
	} else {
		return line.match("\\ide");
	}
}

exports.isHeader = function(line){
	if(!(line != null)) {
		return false
	} else {
		return line.match("\\h");
	}
}
