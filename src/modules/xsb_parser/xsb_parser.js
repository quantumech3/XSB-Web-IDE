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
	parse: function(script, callback){}
}

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
 * 
 * Given a statement index (starting from 0), this method returns the x y coordinate of the index'th character in script
 * 
 * Returns the following
 * {
 * 		column
 * 		lineNumber
 * }
 * 
 * @param {*} index 
 * @param {*} script 
 */
function indexToCoordinate(index, script)
{
	if(script[index] == '\n')
		throw "Newline is not a valid coordinate."
	else if(index >= script.length || index < 0)
		throw "Out of bounds"

	// newlines = indices of all newlines in script sorted in ascending order
	let newlines = indexOfAll('\n', script);

	let last_newline = 0
	let newline_cnt = 0

	while(newline_cnt < newlines.length && newlines[newline_cnt] < index)
		newline_cnt++
	
	if(newline_cnt > 0)
		last_newline = newlines[newline_cnt - 1]
	else
		last_newline = -1
	
	return {
		column: index - last_newline - 1,
		lineNumber: newline_cnt
	}
}

/**
 * Given a coordinate structure, returns the index at the coordinate in script
 * @param {*} coord 
 * @param {*} script 
 */
function coordinateToIndex(coord, script)
{
	let lineNumbers = indexOfAll('\n', script);

	if(coord.lineNumber == 0)
		return coord.column

	return lineNumbers[coord.lineNumber - 1] + coord.column + 1
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
/*function getStatementBounds(script, n)
{
	let indices = indexOfAll(".", script);
	let lineNumbers = indexOfAll("\n", script);
	let lineNumber = 0;
	let startColumn = 0;
	let endColumn = 0;
	let startLine = 0;
	let endLine = 0;
  
	while (lineNumbers[lineNumber] < indices[n - 1])
	  lineNumber++;
  
	if (lineNumbers[lineNumber + 1] < indices[n]) {
	  startLine = lineNumber + 1;
	} else {
	  startLine = lineNumber;
	}
	while (lineNumbers[lineNumber] < indices[n])
	  lineNumber++;
  
	if (lineNumbers[lineNumber + 1] < indices[n]) {
	  endLine = lineNumber + 1;
	} else {
	  endLine = lineNumber;
	}
  
	if (startLine < 0) {
	  startLine = 0;
	}

	if (n == 0) {
		return {
		  Start: {
			column: 0,
			lineNumber: 0,
		  },
		  End: {
			column: 0,
			lineNumber: endLine,
		  },
		};
	} else {
		return {
		  Start: {
			column: startColumn,
			lineNumber: startLine,
		  },
		  End: {
			column: endColumn,
			lineNumber: endLine,
		  },
		};
	}
}*/

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
	let periods = indexOfAll(".", script);

	if(n == 0)
	{
		let firstPeriod = script.indexOf('.');

		// If there are no periods
		if(firstPeriod == -1)
			return {
				Start: {
					column: 0,
					lineNumber: 0
				},
				End: indexToCoordinate(script.length - 1, script)
			};

		return {
			Start: {
				column: 0,
				lineNumber: 0
			},
			End: indexToCoordinate(script.indexOf('.'), script)
		};
	}
	else
	{
		let startIndex = periods[n - 1] + 1
		
		while(script[startIndex] == '\n')
			startIndex++;

		if(n == periods.length && periods[periods.length - 1] + 1 < script.length) // If indexing last statement and last statement is not period terminated
			return {
				Start: indexToCoordinate(startIndex, script),
				End: indexToCoordinate(script.length - 1, script)
			}

		return {
			Start: indexToCoordinate(startIndex, script),
			End: indexToCoordinate(periods[n], script)
		}
	}
}

/**
* Parses XSB scripts and returns attributes of the script as well as locations of syntax errors. Note that it is the programmers responsability to make sure
* that this is only called after the main XSB instance has been initialized
* 
* @param {string} script 
*/
XSBParser.parse = function(script)
{
	// Pipe all XSB stdout to stdoutQueue for use when getting error message
	let stdoutBuffer = []

	// Redefine stdout handling to pipe to buffer
	XSB.Events.onOutput = function(output, isError)
	{
		console.log(output)
		stdoutBuffer = stdoutBuffer.concat([output])
	}

	let output = 
	{
		dependencies: [],
		atoms: [],
		error: undefined
	}

	let ctr = 0;

	// Get the statement number of the error
	writeToFile('temp.P', script);
	let result = XSB.execute("open('temp.P', read, X).");
	for(result = XSB.execute("read(7, X)."); result.var.length > 0 && result.var[0] != "end_of_file" || result.var.length == 0; result = XSB.execute("read(7, X)."))
	{
		if(!result.isTrue)
		{
			output.error = getStatementBounds(script, ctr);

			// Set message to all XSB output and reset queue
			output.error.message = stdoutBuffer.reduce((a, b) => a + "\n" + b, "");

			break;
		}

		ctr++
	}

	XSB.execute("close(7).");

	return output
}