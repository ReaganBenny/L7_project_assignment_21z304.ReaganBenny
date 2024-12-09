from . import db

# Association table for many-to-many relationship between Flavor and Allergen
class FlavorAllergen(db.Model):
    __tablename__ = 'flavor_allergens'  # Define the name of the association table
    id = db.Column(db.Integer, primary_key=True)
    flavor_id = db.Column(db.Integer, db.ForeignKey('flavor.id'), nullable=False)
    allergen_id = db.Column(db.Integer, db.ForeignKey('allergen.id'), nullable=False)

class Flavor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    is_seasonal = db.Column(db.Boolean, default=False)
    allergens = db.relationship('Allergen', secondary='flavor_allergens', backref='flavors')

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(20))

class Allergen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    flavor_id = db.Column(db.Integer, db.ForeignKey('flavor.id'))
    flavor = db.relationship('Flavor')

class Suggestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flavor_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    allergens = db.Column(db.String(200))
    