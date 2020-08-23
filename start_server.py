from flask import Flask, send_from_directory

server = Flask(__name__)

# Send a file located in the presentation module when one is requested
@server.route("/<path:file>")
def generic_response(file):
	return send_from_directory("./src/modules/presentation/", file)

# Send main webpage when "/" url is queried by client
@server.route("/")
def home():
	return send_from_directory("./src/modules/presentation/", "index.html")

# Start server on port 8000
server.run("localhost", "8000")