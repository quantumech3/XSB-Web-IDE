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

// The main browser thread passes commands to this worker in the form of messages
onmessage = function(command)
{
	// If the main browser thread requests for a file to be created, create a file in Emscripten's virtual file system
	if(typeof command.data === "object")
	{
		FS.writeFile(command.data.fileName, command.data.fileData);
	}
	else
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