var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var lines = [];
var count = 0;
var validator;

var s = fs.createReadStream('./Tests/3JN.usfm')
    .pipe(es.split())
    .pipe(es.mapSync(function(line){
        count ++;
        var errors = [];
        
        //object element for each line
        var data = {} ;
        var dataArr = line.split("\\");
        dataArr = dataArr.splice(1, dataArr.length);

        // loop through each lines
        for(var i=0; i<dataArr.length; i++){
           
            //marker and values from each line
            data.marker = dataArr[0].split(" ")[0] ; 
           
            // check if values null after each marker
            // this works for lines which only contains a single marker with no text following eg: \p
            if(dataArr[0].split(/^[^ ]+ /)[1] !== undefined){
                data.value = dataArr[0].split(/^[^ ]+ /)[1]
            }
            else{
                data.value = "null";
            }
            if (data.marker == 'v'){
                data.number = dataArr[0].split(" ")[1]; 
                data.value = dataArr[0].split(/\d+ /)[1];
            }
            
            // handle inline markers as children of the corresponding line
            data.children = [];
            if(dataArr.length > 1){
                childArr = dataArr.slice(1);
                
                //inline markers structure starts from here
                var obj = {};
                for (var j=0; j<childArr.length; j++) {
                    var inlineArr = childArr[j].split(" ");
                    
                    // object for inline markers
                    inlineMarker = inlineArr[0];
                    inlineValue = childArr[j].substr(childArr[j].indexOf(' ')+1) ;
                    // null values if only marker exist
                    if(inlineArr[1] == "" || inlineValue.length == 1){
                        obj.marker = inlineMarker;
                        obj.value = "null";
                    }
                    else{
                        obj.marker = inlineMarker;
                        obj.value = inlineValue;
                    }
                    data.children.push(obj);                
                }
            }
            else{
                data.children = "null";
            }
            // count holds the line numbers in each line
            data.count = count;  
        }
        lines.push(data);
    })
    .on('error', function(){
        console.log('Error while reading file.');
    })
    .on('end', function(){
        
        /*  Validation for Minimum USFM Requirements is done on the basis of this documented details:
            https://git.door43.org/Door43/ContentTechs/wiki/Minimum-USFM-Requirementss
        */

        for (var i in lines) {

            // marker \\id check
            // File identification. 
            // This is the initial USFM marker in any scripture text file. 
            if(lines[i].count === 1){
            
                if(lines[i].marker === 'id'){
                    // console.log("Check for File identification marker '\\id' starts here ")
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
        console.log('Read entire file.')
    })
);

module.exports = validator;
