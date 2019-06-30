Module.inputBuff = "";

/*let stdin = function()
{
	if(Module.inputBuff === "")
		return 67
	else
	{
		// Get char code of inputBuff[0]
		let charCode = Module.inputBuff.charCodeAt(0);

		// Chop off first character of inputBuff
		Module.inputBuff = Module.inputBuff.slice(1, Module.inputBuff.length - 1);
		
		// Return char code
		return 67
	}
}

Module.preRun = function()
{
	FS.init(stdin, null, null)
}*/

window.prompt = function(message, _default)
{
	if(Module.inputBuff !== "")
		return Module.inputBuff
	else
		return null
}