var XSB_LANG = "xsblang";
var XSB_THEME = "xsbtheme"

// Numbers are next to names to control syntax highlighting precedence: ie if a token is both an atom and an operator, then it gets treated like an operator because 0 < 3
var TOKEN_TYPES = 
{
	ATOM: "3atom",
	OPERATOR: "0operator",
	DELIMITER: "1delimiter",
	COMMENT: "4comment",
	TERMINATOR: "2terminator"
}

// Define theme for text editor
monaco.languages.register({id: XSB_LANG})
monaco.languages.setMonarchTokensProvider(XSB_LANG, {
	tokenizer: {
		root: [ // Tokens are named like the following
			[/:\-|\?\-|\*|\/|\+|\-|\=|\,|\;|is/, TOKEN_TYPES.OPERATOR],
			[/[a-zA-Z]+/, TOKEN_TYPES.ATOM],
			[/['()[\]<>{}]/, TOKEN_TYPES.DELIMITER],
			[/%[^\n]+/, TOKEN_TYPES.COMMENT],
			[/\./, TOKEN_TYPES.TERMINATOR]
		]
	}
});

TextEditor.model = monaco.editor.createModel("", XSB_LANG);

monaco.editor.defineTheme(XSB_THEME, {
	base: 'vs-dark',
	inherit: 'false',
	rules: [
		{token: TOKEN_TYPES.OPERATOR, foreground: 'FF8BFF'},
		{token: TOKEN_TYPES.ATOM, foreground: 'C6DCFF'},
		{token: TOKEN_TYPES.DELIMITER, foreground: 'A1E7E4'},
		{token: TOKEN_TYPES.COMMENT, foreground: '666666'},
		{token: TOKEN_TYPES.TERMINATOR, foreground: 'B6D7A8'}
	]
});

// Initialize text editor
let model = TextEditor.model;
TextEditor.editor = monaco.editor.create(document.getElementById('text_editor'), {model});

monaco.editor.setTheme(XSB_THEME)

// Lint code 2 times a second after 1 second (give XSB time to start)
setTimeout(() => setInterval(TextEditor.lint, 500), 1000);

// Register file_input event
document.getElementById('file_input').onchange = Menubar.fileInputClicked;