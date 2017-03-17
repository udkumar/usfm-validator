var validator = require('./validator.js');
// var lines = require('./validator').lines;

// console.log(validator.lines)

exports.usfmValidate = function(line){
	//marker \\ide check
            if(lines[i].marker === 'ide'){
                var markerIde = lines[i].value;
                count = lines[i].count;
                var regEx = /(UTF-8 || UTF-16 || CP-1252 || CP-1251 )/;
                if(markerIde.match(regEx)){
                    console.log("The \\ide marker of this file is "+"'"+ markerIde +"'"+" found in line "+ count);
                }
            }
            // else{
            //         console.log("Ide marker is not validated acc to minimum usfm requirement--->"+"'"+markerIde+"'")
            // }

            //marker \\h check
            if(lines[i].marker === 'h'){
                var markerHeader = lines[i].value;
                count = lines[i].count;
                console.log("The \\h marker of this file is "+"'"+ markerHeader +"'"+" found in line "+ count);
            }
            // else{
            //         console.log("Header marker is not validated acc to minimum usfm requirement--->"+"'"+markerHeader+"'")
            // }

            //marker \\toc1 check
            if(lines[i].marker === 'toc1'){
                var markerToc1 = lines[i].value;
                count = lines[i].count;
                console.log("The \\toc1 marker of this file is "+"'"+ markerToc1 +"'"+" found in line "+ count);
            }

            //marker \\toc2 check
            if(lines[i].marker === 'toc2'){
                var markerToc2 = lines[i].value;
                count = lines[i].count;
                console.log("The \\toc2 marker of this file is "+"'"+ markerToc2 +"'"+" found in line "+ count);
            }

            //marker \\toc3 check
            if(lines[i].marker === 'toc3'){
                var markerToc3 = lines[i].value;
                count = lines[i].count;
                console.log("The \\toc3 marker of this file is "+"'"+ markerToc3 +"'"+" found in line "+ count);
            }

            //marker \\mt check
            if(lines[i].marker === 'mt'){
                var markerMt = lines[i].value;
                count = lines[i].count;
                console.log("The \\mt marker of this file is "+"'"+ markerMt +"'"+"found in line "+ count);
            }

            //marker \\c check
            if(lines[i].marker === 'c'){
                var markerChapter = lines[i].value;
                console.log("This is Chapter "+markerChapter);
                count = lines[i].count;
                console.log("The \\c marker of this file for chapter "+"'"+ markerChapter +"'"+"is found in line "+ count);
                chapNum.push(markerChapter);
            }

            //marker \\p check
            if(lines[i].marker === 'p'){
                var markerPara = lines[i].value;
                count = lines[i].count;
                console.log("The \\p marker of this file is found in "+ count)
            }
            //marker \\v check
            if(lines[i].marker === 'v'){
                var markerVerse = lines[i].number;
                count = lines[i].count;
                console.log("The \\v marker of this file for verse "+"'"+ markerVerse +"'"+"is found in line "+ count);
                verseNum.push(markerVerse);
            }
        }
        // chapter number order check
        //missing chapter number
        function chapterCheck(){
            var missing;
            for(j=1; j <= chapNum.length; j++){
                if(chapNum[j-1]!= j){
                    missing = j;
                    console.log( "The missing Chapter number is " + missing)
                }
            }
        }
        // verse number order check
        //missing verse number
        var missing;
        for(j=1; j <= verseNum.length; j++){
            if(verseNum[j-1]!= j){
                missing = j;
                console.log( "The missing Verse number is " + missing)
            }
        }
        console.log(verseNum)
  
}

module.exports = usfmValidate;