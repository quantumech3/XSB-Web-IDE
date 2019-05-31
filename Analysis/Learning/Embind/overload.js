Module.onRuntimeInitialized = function()
{
	// Get C++ vector
	// Vector gets returned as an object with all the same attributes..
	// ..as a C++ vector.
	let vector = Module.returnVector();

	// Print all values of the vector (4, 5, 6)
	for(let i = 0; i < vector.size(); i++)
	{
		console.log(vector.get(i));
	}
}