#!/usr/bin/env python3

import http.server
import ssl
import socketserver
import os
from pathlib import Path

PORT = 8443

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

def create_self_signed_cert():
    """Create a self-signed certificate for localhost"""
    try:
        import subprocess
        
        # Generate private key
        subprocess.run([
            'openssl', 'req', '-newkey', 'rsa:2048', '-nodes', '-keyout', 'localhost.key',
            '-x509', '-days', '365', '-out', 'localhost.crt',
            '-subj', '/C=US/ST=State/L=City/O=Organization/CN=localhost'
        ], check=True)
        
        print("✅ Self-signed certificate created successfully")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ OpenSSL not found or failed to create certificate")
        return False

def main():
    # Check if certificate files exist
    if not (Path('localhost.crt').exists() and Path('localhost.key').exists()):
        print("🔐 Creating self-signed certificate for HTTPS...")
        if not create_self_signed_cert():
            print("⚠️  Could not create certificate. Falling back to HTTP on port 3000")
            print("You'll need to update your Spotify app redirect URI to: http://localhost:3000/availability-checker.html")
            
            # Fallback to HTTP
            with socketserver.TCPServer(("", 3000), Handler) as httpd:
                print(f"🌐 Serving HTTP at http://localhost:3000/")
                httpd.serve_forever()
            return

    # Create HTTPS server
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        # Create SSL context
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain('localhost.crt', 'localhost.key')
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
        
        print(f"🔒 Serving HTTPS at https://localhost:{PORT}/")
        print(f"🌐 Open your browser and go to: https://localhost:{PORT}/availability-checker.html")
        print("⚠️  You may see a security warning - click 'Advanced' and 'Proceed to localhost (unsafe)'")
        print("📝 Make sure your Spotify app redirect URI is set to: https://localhost:8443/availability-checker.html")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    main()