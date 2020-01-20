### Summary
XSB-Terminal-Lib is a library that summons a Terminal running the XSB Interpreter at a user-specified location in a webpage. 

------------------------
### How to build xsbInterpreter.js

**1**. Run `make build`

------------------------
### How to setup XSB-Terminal-Lib

**1**. Copy the following files/folders into your project directory

* deps
* xsbInterpreter.js
* xsbInterpreter.wasm
* xsbInterpreter.fetch.js
* xsbInterpreter.worker.js
* xsbInterpreter.js.mem
* xsbInterpreter.data
* xsbTerminalLib.js

**2**. Add the following code to the top of your project's `<head>` section

```html
<script src="deps/jquery-3.2.1.min.js"></script>
<script src="deps/jquery.terminal.min.js"></script>
<link href="deps/jquery.terminal.min.css" rel="stylesheet"/>
<script src="deps/xhr-mock.js"></script>
```

**3**. Add the following code to the absolute bottom of your project's `<body>` section

```html
<script>
var XSB_PROPERTIES = 
{
	STARTUP_MESSAGE: "", // Insert what you want your startup message to be here
	TERMINAL_ELEMENT_ID: "" // Insert the ID of the HTML element you want the terminal to reside in here
}
</script>
```

**4**. Add the following code to the absolute bottom of your project's `<body>` section

```html
<script src="xsbTerminalLib.js"></script>
<script src="xsbInterpreter.js"></script>
```

------------------------
### Directory Structure

* **deps/:** Folder containing JS & CSS dependancies
* **xsbTerminalLib.js:** The XSB-Terminal-Lib JS library
* **xsbInterpreter.js**: JS Web Assembly interpreter for XSB Prolog
* **xsbInterpreter.wasm:** xsbInterpreter.js dependency
* **xsbInterpreter.fetch.js:** xsbInterpreter.js dependency
* **xsbInterpreter.worker.js:** xsbInterpreter.js dependency
* **xsbInterpreter.js.mem:** xsbInterpreter.js dependency
* **xsbInterpreter.data:** xsbInterpreter.js dependency
* **src/:** Contains source files that get built into xsbInterpreter.js
	* **xsbInterpreter.c:** Passes user input into XSB Interpreter and outputs query results
	* **config/:** Contains XSB Interpreter object code
	* **emu/:** Contains XSB C Interface header files
* **makefile:** Used to rebuild src/xsbInterpreter.c to WASM
* **debug_page.html:** Used to test modifications to this library
	

------------------------
### Please note that
* All files and folders specified in step 1 of 'How to setup XSB-Terminal-Lib' must be in the same directory for XSB-Terminal-Lib to function properly
* To execute `make build`, you must have Emscripten 1.38.30 installed.
