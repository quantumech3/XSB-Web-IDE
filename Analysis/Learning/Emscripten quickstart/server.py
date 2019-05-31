import http.server
import socketserver

handler = http.server.SimpleHTTPRequestHandler
handler.extensions_map.update({'.wasm': 'application/wasm', '.data': 'application/octet-stream'})
httpd = http.server.HTTPServer(("", 8080), handler)
httpd.serve_forever()

