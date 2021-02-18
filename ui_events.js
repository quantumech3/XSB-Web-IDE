var Menubar = 
{
	newButtonClicked: function(){}, 
	openButtonClicked: function(){},
	fileInputClicked: function(){},
	saveButtonClicked: function(){}
}

var Terminal = 
{
	resetButtonClicked: function(){},
	runButtonClicked: function(){}
}

var TextEditor =
{
	editor: undefined,
	model: undefined,
	autocompleteRequested: function(keywords={}, isTopLevel=true, fileToParse=undefined){}, // TODO: Implement this
	lint: function(){}
}

/**
 * Transforms syntax errors from XSB Parser module into Monaco editor errors for linting
 * @param {} error 
 */
function xsbParserErrorToMonacoError(error)
{
	return {
		startLineNumber: error.Start.lineNumber + 1,
		startColumn: error.Start.column + 1,
		endLineNumber: error.End.lineNumber + 1,
		endColumn: error.End.column + 2, // Indexing starts from 1 and is end-exclusive in monaco
		message: error.message + '\n',
		severity: monaco.MarkerSeverity.Error
	}
}

Menubar.newButtonClicked = function()
{
	let userIsSure = confirm("Are you sure you want to create a new script?");

	if(userIsSure)
	{
		// Clear text in text editor
		TextEditor.editor.setValue("");
	}
}

Menubar.openButtonClicked = function()
{
	// Summon a file browser by clicking on the “file_input” html element. This event starts Menubar.fileInputClicked()
	document.getElementById("file_input").click();
}

// Called when the user selects a file to be read
Menubar.fileInputClicked = function()
{
	let selectedFile = this.files[0];
	let fileReader = new FileReader()

	fileReader.onloadend = function()
	{
		TextEditor.editor.setValue(fileReader.result);
	}

	fileReader.readAsText(selectedFile);
}

Menubar.saveButtonClicked = function()
{
	saveAs(new Blob([TextEditor.editor.getValue()]), 'script.P');
}

Terminal.resetButtonClicked = function()
{
	xsbTerm.stopXSB();
	xsbTerm.clear();
	xsbTerm.startXSB();
}

Terminal.runButtonClicked = function()
{
	// Get the text inside of the text editor and
	// create a file at “/” in XSB’s virtual filesystem called “script.P” then
	// set the contents of script.P to the text inside of the text editor
	xsbTerm.writeFile("script.P", textEncoder.encode(TextEditor.editor.getValue()));
	xsbTerm.clear();

	// Load script into XSB runtime
	xsbTerm.executeXSBCommand("consult('script.P').");
}

TextEditor.lint = function()
{
	let error = XSBParser.parse(TextEditor.editor.getValue()).error;

	if(error)
	{
		let monacoError = xsbParserErrorToMonacoError(error);
		// TODO: Finish implementing syntax error rendering
		monaco.editor.setModelMarkers(TextEditor.model, "owner", 
		[
			monacoError
		]);
	}
	else // If there is no error then remove all red underlines
	{
		monaco.editor.setModelMarkers(TextEditor.model, "owner", []);
	}
}