Module.onRuntimeInitialized = function()
{
	// Create new typed array initialized to [1,2,3,40000,5]
	// You can also use Float32Array, or any other TypeArray
	// Keep in mind that you need to use the correctly sized TypeArray
	// To align with the size of the C datatype of what you are setting
	let data = new Int32Array([1,2,3,40000,5])

	// Allocate block of memory for array and get address of the block
	let ptr = Module._malloc(data.BYTES_PER_ELEMENT * data.length)

	// Set the block of memory to the int array
	// You NEED to use 'new Uint8Array(data.buffer)' to wrap 'data'
	// because you are setting data in HEAPU8 which requires a view
	// to an unsigned byte-sized int array
	//
	// So if you used HEAP8 instead of HEAPU8, you would use 
	// 'new Int8Array' instead
	Module.HEAPU8.set(new Uint8Array(data.buffer), ptr);

	// Call sum_arr with pointer to array
	Module.cwrap('sum_arr', 'number', ['number', 'number'])(ptr, 5)
}

