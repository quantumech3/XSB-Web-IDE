/* 
JS code for the web worker driving the XSB interface. The XSB interface is driven via a web worker so infinite loops executed in the XSB interpreter do not block the web browser's runtime
*/

// Override stderr output to send as text back to main browser thread.
// This is being done because their is no way to invoke term.echo() directly from a web worker, so stderr is being passed to..
// ...the main thread as a string
console.error = function(message)
{
	postMessage(
		{
			stdout: message,
			results: undefined
		}
	);
}

// Override stderr output to send as text back to main browser thread.
// This is being done because their is no way to invoke term.echo() directly from a web worker, so stderr is being passed to..
// ...the main thread as a string
console.log = function(message)
{
	postMessage(
		{
			stdout: message,
			results: undefined
		}
	);
}

// Import the XSB JS Interface. Web workers do not have access to the browser's global scope so the library must be re-imported
self.importScripts("xsbInterface.js");

XSB.init();

// Used for read_file command
let textDecoder = new TextDecoder();

// The main browser thread passes commands to this worker in the form of messages
onmessage = function(command)
{
	if(command.data.command)
	{
		switch(command.data.command)
		{
			case "write_file": // Handle writeFile command
				FS.writeFile(command.data.args[0], command.data.args[1]); 
				break;
			case "read_file": // Handle readFile command
				// Return file data as a string
				postMessage({command: "read_file_callback", args: [command.data.args[0], textDecoder.decode(FS.readFile(command.data.args[0]))]});
		}
	}
	else if(typeof command.data == "string")
	{
		// Execute the specified XSB command and return the query results in the form of a message
		this.postMessage(
			{
				stdout: undefined,
				results: XSB.execute(command.data)
			}
		);
	}
}