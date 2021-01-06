from flask import Flask, send_from_directory

server = Flask(__name__)

# Send a file located in the presentation module when one is requested
@server.route("/<path:file>")
def generic_response(file):
	# The XSB Terminal library currently assumes all library files are at root.
	if "xsbInterface" in file or "xsbTerminal" in file:	# If a file from the xsbInterface or xsbTerminal is requested, then send it from ./src/modules/terminal. 
		if ".wasm" in file: # Manually send file with mimetype according to extension (Flask mimetype inference is bad)
			return send_from_directory('./src/modules/terminal/', file, mimetype="application/wasm")
		elif ".js" in file:
			return send_from_directory('./src/modules/terminal/', file, mimetype="text/javascript")
		return send_from_directory('./src/modules/terminal/', file)
		
	return send_from_directory("./src/", file)

# Send main webpage when "/" url is queried by client
@server.route("/")
def home():
	return send_from_directory("./src/modules/presentation/", "index.html")

# Start server on port 8000
server.run("localhost", "8000")