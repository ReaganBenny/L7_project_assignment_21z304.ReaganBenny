from flask import Blueprint, jsonify, request
from .models import db, Flavor, Ingredient, Allergen, Cart, Suggestion

main = Blueprint('main', __name__)

@main.route('/flavors', methods=['GET'])
def get_flavors():
    seasonal = request.args.get('seasonal', type=bool)
    search = request.args.get('search', '')
    
    query = Flavor.query
    if seasonal is not None:
        query = query.filter_by(is_seasonal=seasonal)
    if search:
        query = query.filter(Flavor.name.ilike(f'%{search}%'))
    
    flavors = query.all()
    return jsonify([{
        'id': f.id,
        'name': f.name,
        'description': f.description,
        'is_seasonal': f.is_seasonal,
        'allergens': [a.name for a in f.allergens]
    } for f in flavors])

@main.route('/allergens', methods=['GET', 'POST'])
def handle_allergens():
    if request.method == 'POST':
        data = request.json
        allergen = Allergen(name=data['name'])
        db.session.add(allergen)
        db.session.commit()
        return jsonify({'message': 'Allergen added successfully'})
    
    allergens = Allergen.query.all()
    return jsonify([{'id': a.id, 'name': a.name} for a in allergens])

@main.route('/cart/<user_id>', methods=['GET', 'POST', 'DELETE'])
def handle_cart(user_id):
    if request.method == 'POST':
        data = request.json
        cart_item = Cart(user_id=user_id, flavor_id=data['flavor_id'])
        db.session.add(cart_item)
        db.session.commit()
        return jsonify({'message': 'Added to cart'})
    
    elif request.method == 'DELETE':
        flavor_id = request.args.get('flavor_id')
        Cart.query.filter_by(user_id=user_id, flavor_id=flavor_id).delete()
        db.session.commit()
        return jsonify({'message': 'Removed from cart'})
    
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': item.id,
        'flavor': {
            'id': item.flavor.id,
            'name': item.flavor.name
        }
    } for item in cart_items])

@main.route('/suggestions', methods=['POST'])
def add_suggestion():
    data = request.json
    suggestion = Suggestion(
        flavor_name=data['flavor_name'],
        description=data.get('description', ''),
        allergens=data.get('allergens', '')
    )
    db.session.add(suggestion)
    db.session.commit()
    return jsonify({'message': 'Suggestion added successfully'})