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
            if(dataArr.length > 1){
                data.children = [];
                childArr = dataArr.slice(1)
                
                //object for inline markers
                var obj = {}
                childArr.forEach(function(value, index, array){
                    obj.marker = childArr[index].split(" ")[0] ;
                    obj.value = childArr[index].substr(childArr[index].indexOf(' ')+1)
                })
                data.children.push(obj);
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
        // console.log(lines)

        /*  #Validation for Minimum USFM Requirements in given usfm file described here:
            https://git.door43.org/Door43/ContentTechs/wiki/Minimum-USFM-Requirementss
        */

        var chapNum = [];
        var verseNum = [];
        for (var i in lines) {
            
            // marker \\id check
            if(lines[i].marker === 'id'){
                // console.log("Check for File identification marker '\\id' starts here ")
                var markerID = lines[i].value.split(" ")[0];
                count = lines[i].count;
                var regEx = /(\d[A-Z]{2})|(\w[A-Z]{2})/;
                if (markerID.match(regEx)){
                    console.log("The \\id marker of this usfm file is "+"'"+ markerID +"'"+" found in line "+ count)
                }
                else{
                    console.log("ID marker is not validated acc to minimum usfm requirement--->"+"'"+markerID+"'")
                }
            }
            
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
                chapterCheck();
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

        if(!markerID){
                console.log("usfm-validator could not find \\id marker in this given file.");
            }
        /* end of validation check */
        

        console.log('Read entire file.')
    })
);

module.exports = validator;

