# usfm-validator(WIP)

A library function which validates USFM files for minimum USFM requirements.

### Sources

**USFM Documentation**
http://ubsicap.github.io/usfm/

**Minimum USFM Requirements**
https://git.door43.org/Door43/ContentTechs/wiki/Minimum-USFM-Requirements
	
### Setup
 `npm install usfm-validator`

## Usage
	var usfm = require('usfm-validator');
	//check usfm file
	var validateUsfm = usfm.getUsfm(/**USFM file path**/);

### Run the app
1. `node index.js`