var message = window.prompt("Input something")
var i = 0
var Module = {
  preRun: function() {
    function stdin() {
		if(i < message.length)
		{
			return message.charCodeAt(i++)
		}
		else
		{
			i = 0;
			message = window.prompt("Input something")
			return null;
		}
    }

    FS.init(stdin, null, null);
  }
};