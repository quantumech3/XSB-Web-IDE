// Handles XSB commands that are typed into the console
let handleXSBCommand = function(command)
{
	
	// If either the user-inputted command lacks a period at the end, only contains a period, or is an empty string, throw error
	// These user-errors must be handled because the XSB C Interface will crash on user input if they aren't handled
	if(command[command.length - 1] != '.' || command.length == 1 || command.length == 0)
	{
		XSB.execute("writeln('Invalid command').")
		return;
	}

	// Invoke XSB-JS-Interface to execute the command 'command' and gets results of the command (See XSB-JS-Interface source code comments for more info on XSB.execute())
	let results = XSB.execute(command)

	// Print XSB query results if such results exist (XSB.execute() returns [""] when no query results exist which is equivilent to 'false' in JS)
	if(results[0])
	{
		let resultString = ""

		for(let i = 0; i < results.length; i++)
		{
			// Append result of XSB query to resultString
			resultString += results[i]

			// Add newline to the end of each XSB query result unless it is the last XSB query result
			if(i !== results.length - 1)
				resultString += '\n'
		}

		// Print resultString into Terminal
		XSB.Events.onOutput(resultString)
	}
}

// Initialize Terminal object inside the (XSB_PROPERTIES.TERMINAL_ELEMENT_ID) element with custom startup message (XSB_PROPERTIES.STARTUP_MESSAGE)
var term = $('#' + XSB_PROPERTIES.TERMINAL_ELEMENT_ID).terminal(handleXSBCommand, {greetings: XSB_PROPERTIES.STARTUP_MESSAGE, prompt: "?- "});
var re = /^___terminal::/;

// Make XSB-JS-Interface output to terminal rather then browser console
XSB.Events.onOutput = function(output, isError)
{
	term.echo(output)
}

// Initialize XSB
XSB.init()