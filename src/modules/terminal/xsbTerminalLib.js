var xsbWorker = new Worker("");
var xsbTerm = 
{
	executeXSBCommand: function(command=""){}, // Invoked by JQuery terminal after the user inputs an XSB command
	handleXSBOutput: function(results){}, // Invoked by XSB web worker when query results are returned from a command
	startXSB: function(){},
	stopXSB: function(){},
	writeFile: function(fileName="", fileData=""){} // Create a file in the Emscripten Virtual File system
}

// When the XSB web worker returns query results resulting from an XSB command, pass results and standard output to executeXSBCommand() and handleXSBOutput()
var handleWorkerMessage = function(message)
{
	// Print standard output from XSB interpreter
	if(message.data.stdout)
		term.echo(message.data.stdout);

	// Print results from XSB query
	if(message.data.results)
		xsbTerm.handleXSBOutput(message.data.results);
}

// Invoked by JQuery terminal after the user inputs an XSB command
xsbTerm.executeXSBCommand = function(command="")
{
	// If either the user-inputted command lacks a period at the end, only contains a period, or is an empty string, throw error
	// These user-errors must be handled because the XSB C Interface will crash on user input if they aren't handled
	if(command[command.length - 1] != '.' || command.length == 1 || command.length == 0)
	{
		xsbWorker.postMessage("writeln('Invalid command').");
		return;
	}

	// Else if the command is valid, execute the XSB command via a web worker
	term.set_prompt(""); 
	xsbWorker.postMessage(command);
}

// Create a file in the Emscripten Virtual File system
xsbTerm.writeFile = function(fileName="", fileData="")
{
	xsbWorker.postMessage({fileName, fileData});
}

// Invoked by XSB web worker when query results are returned from a command
xsbTerm.handleXSBOutput = function(results)
{
	// Print XSB query results if such results exist (XSB.execute() returns [""] when no query results exist which is equivilent to 'false' in JS)
	if(results.var[0])
	{
		for(let j = 0; j < results.var[0].length; j++)
		{
			for(let i = 0; i < results.var.length; i++)
			{
				term.echo("Var #" + i.toString() + ": " + results.var[i][j])
			}
			term.echo();
		}
	}

	if(results.isTrue)
		term.echo("yes.")
	else
		term.echo("no.")

	term.set_prompt("?- ");
}

// Creates new instance of web worker
xsbTerm.startXSB = function()
{
	// Reset terminal prompt
	term.set_prompt("?- ");

	// Initialize XSB web worker
	xsbWorker = new Worker("xsbTerminalWorker.js");

	// When the XSB web worker returns query results resulting from an XSB command, pass results and standard output to executeXSBCommand() and handleXSBOutput()
	xsbWorker.onmessage = handleWorkerMessage;
}

// Terminates XSB web worker
xsbTerm.stopXSB = function()
{
	xsbWorker.terminate();
}

// Initialize Terminal object inside the (XSB_PROPERTIES.TERMINAL_ELEMENT_ID) element with custom startup message (XSB_PROPERTIES.STARTUP_MESSAGE)
var term = $('#' + XSB_PROPERTIES.TERMINAL_ELEMENT_ID).terminal(xsbTerm.executeXSBCommand, {greetings: XSB_PROPERTIES.STARTUP_MESSAGE, prompt: "?- "});
var re = /^___terminal::/;

// Initialize XSB interface web worker after 1 second to prevent weird crashes
setTimeout(() => {xsbTerm.startXSB();}, 1000);