// '<funcName>__postset': '<newFuncName>'
// Sets the function 'closure()' to a new version of itsself after every call
mergeInto(LibraryManager.library, {
// '<funcName>__postset': '<newFuncName>'
	closure: function()
	{
		document.getElementsByTagName("textarea")[0].value = "Hello";
	}
})