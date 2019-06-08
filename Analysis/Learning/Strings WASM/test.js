function cprint(text)
{
	// Add null terminator to text so C doesn't overrun the string
	text += '\0';

	// Allocate memory on heap for string. Each character takes 1 byte
	let ptr = Module._malloc(text.length);

	// Get handle to newly allocated memory
	let rawData = new Uint8Array(Module.HEAPU8.buffer, ptr, text.length)

	// Set memory to value of text
	for(let i = 0; i < text.length; i++)
		rawData[i] = text.charCodeAt(i)

	Module._cprint(ptr)

	// Free memory like a good boy
	Module._free(ptr)
}

Module.onRuntimeInitialized = function()
{
	cprint("Hello computer science!")
}