from flask import Flask, send_from_directory

server = Flask(__name__)

# Send a file located in the presentation module when one is requested
@server.route("/<path:file>")
def generic_response(file):
	if ".wasm" in file: # Manually send file with mimetype according to extension (Flask mimetype inference is bad)
			return send_from_directory('./', file, mimetype="application/wasm")
	return send_from_directory("./", file)

# Send main webpage when "/" url is queried by client
@server.route("/")
def home():
	return send_from_directory("./", "index.html")

# Start server on port 8000
server.run("localhost", "8000")