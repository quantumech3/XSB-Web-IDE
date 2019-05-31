var Module = require('./index.js');

var a = 0;

Module.onRuntimeInitialized = function()
{
	console.log(a);
}
