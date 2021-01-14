/**
 * Written and developed by Jasmine Chin, Scott Burgert and Paul Fodor
 * 
 * Description: The XSB Parser module can be used to parse XSB scripts, 
 * detect basic syntax errors and get the dependencies of a particular script. This module is built on top of the Peg JS Parser module, 
 * however it is separate from that module to enforce this project’s goal of modularity. 
 * This module itself is entirely contained inside of xsb_parser.js and its code is outlined below.
 */

let textEncoder = new TextEncoder();
let textDecoder = new TextDecoder();

function writeToFile(path, str)
{
	FS.writeFile(path, textEncoder.encode(str));
}

function readFromFile(path)
{
	return textDecoder.decode(FS.readFile(path));
}

let XSBParser = 
{
	parse: function(script){}
}

/**
 * Parses XSB scripts and returns attributes of the script as well as locations of syntax errors
 * 
 * @param {string} script 
 */
XSBParser.parse = function(script)
{
	let output = 
	{
		dependencies: [],
		atoms: [],
		error: undefined,
		message: ""
	}

	XSB.init();
	setTimeout(() => {
		let ctr = 0;
		let newline = 0;
		writeToFile('temp.P', script);
		let file = XSB.execute("open('temp.P', read, X).");

		while (true) {
			let statement = XSB.execute("read(7,X).");
			if (statement.isTrue == false) {
				if (ctr == 0) {
					output.error = { Start: { column: 0, lineNumber: 0 }, End: { column: 0, lineNumber: 0 }, message: };
				} else {
					output.error = { Start: { column: ctr - 1, lineNumber: newline - 1 }, End: { column: ctr, lineNumber: newline }, message: };
				}
			}
		};
	}, 1000);
}