from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/checkout', methods=['POST'])
def checkout():
    try:
        data = request.json
        if not data:
            return jsonify({'message': 'No JSON data provided'}), 400
        print(f"Received checkout data: {data}")
        return jsonify({'message': 'Checkout processed successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
