var stdinBuffer = window.prompt("Input something");
var i = 0;
var Module = 
{
	stdin: function()
	{
		window.prompt("stdin being called")
		if(i < stdinBuffer.length)
			return stdinBuffer.charCodeAt(i++);
		else
		{
			stdinBuffer = window.prompt("Input query:");
			i = 0;
			return null;
		}
	}
}