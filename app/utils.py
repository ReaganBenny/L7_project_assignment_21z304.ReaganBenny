from .models import db, Flavor, Ingredient, Allergen

def init_sample_data():
    # Add sample allergens
    allergens = ['Milk', 'Nuts', 'Eggs', 'Soy']
    for allergen_name in allergens:
        existing_allergen = Allergen.query.filter_by(name=allergen_name).first()
        if not existing_allergen:
            allergen = Allergen(name=allergen_name)
            db.session.add(allergen)
            print(f"Added allergen: {allergen_name}")
        else:
            print(f"Allergen already exists: {allergen_name}")
    
    # Add sample flavors
    flavors = [
        Flavor(name='Vanilla Bean', description='Classic vanilla with real bean specks', is_seasonal=False),
        Flavor(name='Chocolate Fudge', description='Rich chocolate with fudge swirl', is_seasonal=False),
        Flavor(name='Pumpkin Spice', description='Seasonal fall favorite', is_seasonal=True),
    ]
    for flavor in flavors:
        db.session.add(flavor)
    
    # Add sample ingredients
    ingredients = [
        Ingredient(name='Cream', quantity=100, unit='liters'),
        Ingredient(name='Sugar', quantity=50, unit='kg'),
        Ingredient(name='Vanilla Beans', quantity=200, unit='pieces')
    ]
    for ingredient in ingredients:
        db.session.add(ingredient)
    
    db.session.commit()