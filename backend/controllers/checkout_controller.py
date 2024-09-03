# controllers/checkout_controller.py
from flask import request, jsonify

def process_checkout():
    try:
        data = request.json

        # Validate input data
        if not all(key in data for key in ['name', 'phone', 'email', 'products', 'total']):
            return jsonify({'message': 'Invalid input data'}), 400

        # Process the checkout data (For demonstration, just printing it)
        print(f"Received checkout data: {data}")

        # Return success response
        return jsonify({'message': 'Checkout processed successfully'}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500
