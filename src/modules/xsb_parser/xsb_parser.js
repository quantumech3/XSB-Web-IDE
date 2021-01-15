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

XSB.init();

function writeToFile(path, str)
{
	FS.writeFile(path, textEncoder.encode(str));
}

function readFromFile(path)
{
	return textDecoder.decode(FS.readFile(path));
}

var XSBParser = 
{
	parse: function(script){}
}

// Used for parse()
let errorMsg = "";


/**
 * Get the location of all occurances of re in str
 * @param {*} re 
 * @param {*} str 
 */
function indexOfAll(re, str)
{
	let indices = [];

	// While another occurance of str exists
	for(let index = str.indexOf(re, 0); index != -1; index = str.indexOf(re, index + 1))
		indices = indices.concat(index)
	
	return indices;
}

/**
 * Given a statement index (starting from 0), this method returns the start and end coordinate (column, lineNumber) of the nth statement
 * 
 * Returns the following
 * {
 * 		Start: 
 * 		{
 * 			column
 * 			lineNumber
 * 		},
 * 		End: 
 * 		{
 * 			column
 * 			lineNumber
 * 		}
 * }
 * 
 * @param {integer} statementIndex 
 */
function getStatementBounds(script, n)
{
	let newline = 0;
	let indices = indexOfAll('.', script);

	for (let i = 0; i <= n; i++) {
		if (script.substring(0, indices[i]).search('\n') != -1) {
			newline++;
		}
	};

	if (n == 0) {
		return {
			Start: {
				column: 0,
				lineNumber: 0
			},
			End: {
				column: 0,
				lineNumber: newline	
			}
		}
	} else {
		return {
			Start: {
				column: n - 1, // FIXME
				lineNumber: newline - 1 // FIXME
			},
			End: {
				column: n, // FIXME
				lineNumber: newline
			}
		}
	}
}

/**
* Parses XSB scripts and returns attributes of the script as well as locations of syntax errors
* 
* @param {string} script 
*/
XSBParser.parse = function(script)
{
	let result = 
	{
		dependencies: [],
		atoms: [],
		error: undefined
	}

	setTimeout(() => {
		let ctr = 0;
		let newline = 0;
		writeToFile('temp.P', script);

		XSB.Events.onOutput = function(output, isError)
		{
			if (isError) {
				errorMsg = output;				
			}
		}

		XSB.execute("open('temp.P', read, X).");
		
		while (true) {
			let statement = XSB.execute("read(7,X).");
			if (statement.isTrue == false) {
				if (ctr == 0) {
					result.error = { 
						Start: { 
							column: 0, 
							lineNumber: 0 
						}, 
						End: { 
							column: 0, 
							lineNumber: 0 
						}, 
						message: errorMsg 
					};

					return result;
				} else {
					result.error = { 
						Start: { 
							column: ctr - 1, 
							lineNumber: newline - 1 
						}, 
						End: { 
							column: ctr, 
							lineNumber: newline                
						}, 
						message: errorMsg 
					};

					return result;
				}
			} else if (statement.var[0] == "end_of_file") {
				return result;
			} else {
				ctr++;
			}
		};
	}, 1000);
}