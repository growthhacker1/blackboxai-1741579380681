from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import json
from urllib.parse import urlparse

# Mock data for testing
MOCK_ORDERS = [
    {
        "_id": "1",
        "biltiNo": "BL001",
        "biltiMiti": "2024-03-10",
        "origin": "Delhi",
        "destination": "Mumbai",
        "status": "Created",
        "payMode": "Due",
        "billTo": "Consignor",
        "items": [
            {
                "description": "Electronics",
                "unit": "Box",
                "packages": 5,
                "rate": 1000,
                "amount": 5000
            }
        ],
        "calculations": {
            "freight": 5000,
            "vatPercentage": 13,
            "vatAmount": 650,
            "totalAmount": 5650
        }
    },
    {
        "_id": "2",
        "biltiNo": "BL002",
        "biltiMiti": "2024-03-09",
        "origin": "Mumbai",
        "destination": "Bangalore",
        "status": "In Transit",
        "payMode": "Paid",
        "billTo": "Consignee",
        "items": [
            {
                "description": "Furniture",
                "unit": "Piece",
                "packages": 3,
                "rate": 2000,
                "amount": 6000
            }
        ],
        "calculations": {
            "freight": 6000,
            "vatPercentage": 13,
            "vatAmount": 780,
            "totalAmount": 6780
        }
    }
]

class OrderManagementHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/billing':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(MOCK_ORDERS).encode())
            return

        # Serve static files
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path == '/api/billing':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            order_data = json.loads(post_data.decode())
            
            # Add mock ID and append to orders
            order_data['_id'] = str(len(MOCK_ORDERS) + 1)
            MOCK_ORDERS.append(order_data)
            
            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(order_data).encode())
            return

        self.send_response(404)
        self.end_headers()

    def do_PUT(self):
        if self.path.startswith('/api/billing/'):
            order_id = self.path.split('/')[-1]
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            order_data = json.loads(put_data.decode())
            
            # Update mock order
            for i, order in enumerate(MOCK_ORDERS):
                if order['_id'] == order_id:
                    MOCK_ORDERS[i] = {**order, **order_data}
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(MOCK_ORDERS[i]).encode())
                    return

        self.send_response(404)
        self.end_headers()

    def do_DELETE(self):
        if self.path.startswith('/api/billing/'):
            order_id = self.path.split('/')[-1]
            
            # Delete mock order
            for i, order in enumerate(MOCK_ORDERS):
                if order['_id'] == order_id:
                    del MOCK_ORDERS[i]
                    self.send_response(200)
                    self.end_headers()
                    return

        self.send_response(404)
        self.end_headers()

if __name__ == '__main__':
    # Change to the directory containing frontend files
    os.chdir('frontend')
    
    # Start server on port 8000
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, OrderManagementHandler)
    print('Server running on port 8000...')
    httpd.serve_forever()
