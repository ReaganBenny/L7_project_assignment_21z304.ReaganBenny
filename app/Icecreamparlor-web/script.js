const apiUrl = 'http://127.0.0.1:5000'; // Update this if your Flask app runs on a different URL

async function searchFlavors() {
    const searchTerm = document.getElementById('search').value;
    const response = await fetch(`${apiUrl}/flavors?search=${searchTerm}`);
    const flavors = await response.json();
    displayFlavors(flavors);
}

function displayFlavors(flavors) {
    const flavorResults = document.getElementById('flavorResults');
    flavorResults.innerHTML = ''; // Clear previous results

    flavors.forEach(flavor => {
        const flavorDiv = document.createElement('div');
        flavorDiv.innerHTML = `
            <h3>${flavor.name}</h3>
            <p>${flavor.description}</p>
            <button onclick="addToCart(${flavor.id})">Add to Cart</button>
        `;
        flavorResults.appendChild(flavorDiv);
    });
}

async function addToCart(flavorId) {
    await fetch(`${apiUrl}/cart/1`, { // Assuming user_id is 1
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flavor_id: flavorId })
    });
    alert('Added to cart');
    fetchCart();
}

async function fetchCart() {
    const response = await fetch(`${apiUrl}/cart/1`); // Assuming user_id is 1
    const cartItems = await response.json();
    displayCart(cartItems);
}

function displayCart(cartItems) {
    const cartResults = document.getElementById('cartResults');
    cartResults.innerHTML = ''; // Clear previous results

    if (cartItems.length === 0) {
        cartResults.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const cartDiv = document.createElement('div');
        cartDiv.innerHTML = `
            <h3>${item.flavor.name}</h3>
            <button onclick="removeFromCart(${item.flavor.id})">Remove from Cart</button>
        `;
        cartResults.appendChild(cartDiv);
    });
}

async function removeFromCart(flavorId) {
    await fetch(`${apiUrl}/cart/1?flavor_id=${flavorId}`, { // Assuming user_id is 1
        method: 'DELETE'
    });
    alert('Removed from cart');
    fetchCart();
}

async function addAllergen() {
    const allergenName = document.getElementById('allergenName').value;
    await fetch(`${apiUrl}/allergens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: allergenName })
    });
    alert('Allergen added successfully');
    document.getElementById('allergenName').value = ''; // Clear input
}
