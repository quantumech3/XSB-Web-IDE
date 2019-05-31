async function loadImage(src)
{
	// Load image from source
	const imgBlob = await fetch(src).then(resp => resp.blob())

	// Create image from raw data
	const img = await createImageBitmap(imgBlob)

	// Get Emscripten webpage canvas
	const canvas = document.getElementById('canvas')

	canvas.width = img.width;
	canvas.height = img.height;

	let ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);

	return ctx.getImageData(0, 0, img.width, img.height);
}

// Define api wrapping C methods
const api =
{
	version: cwrap('version', 'number'),
	createBuffer: cwrap('createBuffer', 'number', ['number', 'number']),
	destroyBuffer: cwrap('destroyBuffer', null, ['number']),
	encode: cwrap('encode', 'number', ['number', 'number', 'number', 'number', 'number', 'number'])
}


// Test the API
Module.onRuntimeInitialized = function()
{
	loadImage('img.jpg').then(function(image)
	{
		// Put image into HEAP memory
		const buff = api.createBuffer(image.width, image.height)
		HEAP8.set(image.data, buff)

		result = api.encode(buff, image.width, image.height, 100);

		let size = new Int32Array(Module.HEAP8.buffer, result, 1)[0]
		let out_imgPtr = new Int32Array(Module.HEAP8.buffer, result + 4, 1)[0]
 		let out_imgRaw = new Uint8Array(Module.HEAP8.buffer, out_imgPtr, size)

		const blob = new Blob([out_imgRaw], {type: 'image/webp'})

		const img = document.createElement('img')
		img.src = URL.createObjectURL(blob);

		document.body.appendChild(img)

		api.destroyBuffer(buff);
	})
}


