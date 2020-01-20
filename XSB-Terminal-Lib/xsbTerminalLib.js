// Initialize Terminal object inside the (XSB_PROPERTIES.TERMINAL_ELEMENT_ID) element with custom startup message (XSB_PROPERTIES.STARTUP_MESSAGE)
var term = $('#' + XSB_PROPERTIES.TERMINAL_ELEMENT_ID).terminal({}, {greetings: XSB_PROPERTIES.STARTUP_MESSAGE});
var re = /^___terminal::/;

// XHR proxy that handle methods from fetch in C
window.XMLHttpRequest = (function(xhr) {
	return function() {
		var url;
		var props = {
			readyState: 4,
			status: 200
		};
		var enc = new TextEncoder("utf-8");
		return new Proxy(new xhr(), {
			get: function(target, name) {
				if (url && ['response', 'responseText', 'status', 'readyState'].indexOf(name) != -1) {
					if (name == 'response') {
						var response = enc.encode(props.responseText);
						console.log(response);
						return response;
					}
					return props[name];
				} else if (name == 'open') {
					return function(method, open_url) {
						if (open_url.match(re)) {
							url = open_url;
						} else {
							return target[name].apply(target, arguments);
						}
					};
				} else if (name == 'send') {
					return function(data) {
						if (url) {
							var payload = url.split('::');
							if (payload[1] == 'read') {
								term.read(
									payload.length > 2 ? payload[2] : '',
									function(text) {
										
										// Set input buffer to user input
										props.responseText = text

										// Add period at end of responseText if one does not exist (XSB C Interface will shutdown with incomplete commands)
										if(props.responseText[props.responseText.length - 1] != '.') 
											props.responseText += '.'

										// If the command contains only periods "...", change the command being queried to a error message (XSB C Interface will shutdown with incomplete commands)
										if(props.responseText.split('.').length - 1 == props.responseText.length)
											props.responseText = "writeln('Invalid command')."

										// Append string length to beginning of responseText
										props.responseText = String.fromCharCode(props.responseText.length) + props.responseText;

										target.onload();
									}
								);
							}
						} else {
							return target[name].apply(target, arguments);
						}
					};
				}
				return target[name];
			},
			set: function(target, name, value) {
				target[name] = value;
			}
		});
	};
})(window.XMLHttpRequest);
 // below code modified from emscripten output html
var Module = 
{
	preRun: [],
	postRun: [],
	print: function(text) 
	{
	 console.log(text);
	 term.echo(text);
	},
	printErr: function(text) 
	{
	 if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
	 term.error(text);
	},
	canvas: (function() 
	{
		var canvas = document.createElement('canvas');
		// As a default initial behavior, pop up an alert when webgl context is lost. To make your
		// application robust, you may want to override this behavior before shipping!
		// See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
		canvas.addEventListener("webglcontextlost", function(e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);
		return canvas;
	})(),
	setStatus: function(text) 
	{
	},
	totalDependencies: 0,
	monitorRunDependencies: function(left) 
	{
	  this.totalDependencies = Math.max(this.totalDependencies, left);
	  Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
	}
	};
	Module.setStatus('Downloading...');
	window.onerror = function(event) {
	// TODO: do not warn on ok events like simulating an infinite loop or exitStatus
	Module.setStatus('Exception thrown, see JavaScript console');
	spinnerElement.style.display = 'none';
	Module.setStatus = function(text) 
	{
		if (text) Module.printErr('[post-exception status] ' + text);
	};
};