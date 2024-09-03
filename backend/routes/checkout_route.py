from flask import Blueprint
from controllers.checkout_controller import process_checkout

checkout_blueprint = Blueprint('checkout', __name__)

@checkout_blueprint.route('/checkout', methods=['POST'])
def checkout():
    return process_checkout()
