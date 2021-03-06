#!/usr/bin/python
from http.server import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep
import socket

PORT_NUMBER = 8080


def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('google.com', 80))
    ip_address = s.getsockname()[0]
    s.close()
    return ip_address

# This class will handles any incoming request from
# the browser


class myHandler(BaseHTTPRequestHandler):

    # Handler for the GET requests
    def do_GET(self):
        if self.path == "/":
            self.path = "/index.html"

        try:
            # Check the file extension required and
            # set the right mime type

            sendReply = False
            if self.path.endswith(".html"):
                mimetype = 'text/html'
                sendReply = True
            if self.path.endswith(".jpg"):
                mimetype = 'image/jpg'
                sendReply = True
            if self.path.endswith(".gif"):
                mimetype = 'image/gif'
                sendReply = True
            if self.path.endswith(".js"):
                mimetype = 'application/javascript'
                sendReply = True
            if self.path.endswith(".css"):
                mimetype = 'text/css'
                sendReply = True
            if self.path.endswith('.ttf'):
                mimetype = 'application/x-font-ttf'
                sendReply = True

            if sendReply is True:
                # Open the static file requested and send it
                with open(curdir + sep + self.path, 'rb') as f:
                    self.send_response(200)
                    self.send_header('Content-type', mimetype)
                    self.end_headers()
                    self.wfile.write(f.read())
            return

        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)


if __name__ == '__main__':
    try:
        # Create a web server and define the handler to manage the
        # incoming request
        server = HTTPServer(('', PORT_NUMBER), myHandler)
        print('Started httpserver on port ', PORT_NUMBER)
        URL = 'http://%s:%s' % (get_ip_address(), PORT_NUMBER)
        print(URL)

        # Wait forever for incoming htto requests
        server.serve_forever()

    except KeyboardInterrupt:
        print(' keyboard interrupt, shutting down the web server')
        server.socket.close()
