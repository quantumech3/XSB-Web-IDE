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
	autocompleteRequested: function(keywords={}, isTopLevel=true, fileToParse=undefined){}, // TODO: Implement this
	lint: function(){}
}