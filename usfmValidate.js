
var validator = require('./validator.js');

var error = [];

exports.Validate  = function(lines) {

	for (var i in lines) {

		// marker \\id check
        // File identification. 
        // This is the initial USFM marker in any scripture text file. 
        if(lines[i].count === 1){
        
            if(lines[i].marker === 'id'){
                console.log("Check for File identification marker '\\id' starts here ")
                var markerID = lines[i].value.split(" ")[0];
                count = lines[i].count;
                var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;
                if (markerID.match(regEx)){
                    console.log("Info: The \\id marker is "+"'"+ markerID +"'"+" found in line "+ count)
                }
                else{
                    console.log("Warning: The \\id marker is not validated according to minimum usfm requirement--->"+"'"+markerID+"'");
                    console.log("The CODE is a standard 3 letter scripture book abbreviation found here:")
                    console.log("http://ubsicap.github.io/usfm/identification/books.html");
                }
            }
            else{
                console.log("Error: The initial USFM marker in any scripture text file is \\id and it is not found in line 1")
            }
        }

        // marker \\ide check
        if(lines[i].marker === 'ide'){
            var markerIde = lines[i].value;
            count = lines[i].count;
            var regEx = /(UTF-8|UTF-16|CP-1252|CP-1251)/;
            if(markerIde.match(regEx)){
                console.log("Info: The \\ide marker is "+"'"+ markerIde +"'"+" found in line "+ count);
            }
            else{
              console.log("Error: The \\ide marker should contain a character encoding specification in line "+ count)
            }
        }
        else{
          error.push("\\ide marker is not found ")
        }

        //marker \\h check
        if(lines[i].marker === 'h'){
            var markerHeader = lines[i].value;
            count = lines[i].count;
            console.log("Info: The \\h marker is "+"'"+ markerHeader +"'"+" found in line "+ count);
        }

        //marker \\toc1 check
        if(lines[i].marker === 'toc1'){
            var markerToc1 = lines[i].value;
            count = lines[i].count;
            console.log("Info: The \\toc1 marker is "+"'"+ markerToc1 +"'"+" found in line "+ count);
        }

        //marker \\toc2 check
        if(lines[i].marker === 'toc2'){
            var markerToc2 = lines[i].value;
            count = lines[i].count;
            console.log("Info: The \\toc2 marker is "+"'"+ markerToc2 +"'"+" found in line "+ count);
        }

        //marker \\toc3 check
        if(lines[i].marker === 'toc3'){
            var markerToc3 = lines[i].value;
            count = lines[i].count;
            console.log("Info: The \\toc3 marker is "+"'"+ markerToc3 +"'"+" found in line "+ count);
        }

        //marker \\mt check
        if(lines[i].marker === 'mt'){
            var markerMt = lines[i].value;
            count = lines[i].count;
            console.log("Info: The \\mt marker is "+"'"+ markerMt +"'"+" found in line "+ count);
        }

        //marker \\c check
        if(lines[i].marker === 'c'){
            var markerChapter = lines[i].value;
            console.log("This is Chapter "+markerChapter);
            count = lines[i].count;
            console.log("Info: The \\c marker for chapter "+"'"+ markerChapter +"'"+" is found in line "+ count);
            // chapNum.push(markerChapter);
        }

        //marker \\p check
        if(lines[i].marker === 'p'){
            var markerPara = lines[i].value;
            count = lines[i].count;
            console.log("Info: The \\p marker for this chapter is found in "+ count);
        }

        //marker \\v check
        if(lines[i].marker === 'v'){
            var markerVerse = lines[i].number;
            count = lines[i].count;
            console.log("Info: The \\v marker for verse "+"'"+ markerVerse +"'"+" is found in line "+ count);
            // verseNum.push(markerVerse);
        }
	}

};





