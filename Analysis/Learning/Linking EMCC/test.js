/**
 * This app is meant to demonstrate the ability for Emscripten to link with DLLs
 * at load time
 * 
 * This app is meant to be ran in NodeJS, as you can see from the module importing,
 * however you can do this in inline js as well.
 */

// Import main module
let Module = require('./main.js')

// Import side module
Module.dynamicLibraries = ['library.wasm']