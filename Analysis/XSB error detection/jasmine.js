let textEncoder = new TextEncoder();
let textDecoder = new TextDecoder();

function writeToFile(path, str)
{
	FS.writeFile(path, textEncoder.encode(str));
}

function readFromFile(path)
{
	return textDecoder.decode(FS.readFile(path));
}