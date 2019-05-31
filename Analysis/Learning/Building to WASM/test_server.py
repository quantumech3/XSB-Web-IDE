from flask import *

# Instantiate new HTTP server
http_server = Flask(__name__)

# Handle requests to root directory with 'index.html'
@http_server.route('/')
def index():
	return send_from_directory('.', 'index.html')

# Handle all other requests to all file formats indescrimately
@http_server.route('/<path:dir>')
def other(dir):
	return send_from_directory('.', dir)

# Start the server
http_server.run('localhost', 80)