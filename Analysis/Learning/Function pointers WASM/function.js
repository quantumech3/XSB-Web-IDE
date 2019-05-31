// function.js
// Contains functions that are referenced via function pointers by C

// Prints 'Hello world' and returns
function func() {
	console.log("Hello world")
	return 3;
}

Module.onRuntimeInitialized = function()
{
	// Get memory address of func()
	var funcPtr = addFunction(func, 'v');

	// Invoke C method that calls function pointer
	Module._callFuncPtr(funcPtr);
}; 