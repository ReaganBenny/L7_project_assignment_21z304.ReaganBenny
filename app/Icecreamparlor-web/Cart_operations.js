const apiUrl = 'http://127.0.0.1:5000'; // Update this if your Flask app runs on a different URL

// Declare the cart variable only once
let cart = [];

// Function to search for flavors
async function searchFlavors() {
    const searchTerm = document.getElementById('search').value;
    const response = await fetch(`${apiUrl}/flavors?search=${searchTerm}`);
    const flavors = await response.json();
    displayFlavors(flavors);
}

// Function to display flavors
function displayFlavors(flavors) {
    const flavorResults = document.getElementById('flavorResults');
    flavorResults.innerHTML = ''; // Clear previous results

    flavors.forEach(flavor => {
        const flavorDiv = document.createElement('div');
        flavorDiv.innerHTML = `
            <h3>${flavor.name}</h3>
            <p>${flavor.description}</p>
            <button onclick="addToCart(${flavor.id}, '${flavor.name}')">Add to Cart</button>
        `;
        flavorResults.appendChild(flavorDiv);
    });
}

// Function to add a flavor to the cart
function addToCart(flavorId, flavorName) {
    const quantity = 1; // You can modify this to allow user input for quantity
    const cartItem = {
        flavorId: flavorId,
        flavorName: flavorName,
        quantity: quantity
    };

    cart.push(cartItem);
    displayCart();
}

// Function to remove a flavor from the cart
function removeFromCart(flavorId) {
    const index = cart.findIndex(item => item.flavorId === flavorId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    displayCart();
}

// Function to display the cart
function displayCart() {
    const cartHtml = document.getElementById('cart');
    cartHtml.innerHTML = '';

    if (cart.length === 0) {
        cartHtml.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartDiv = document.createElement('div');
        cartDiv.innerHTML = `
            <h3>${item.flavorName}</h3>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.flavorId})">Remove from Cart</button>
        `;
        cartHtml.appendChild(cartDiv);
    });
}

// Function to add an allergen
async function addAllergen() {
    const allergenName = document.getElementById('allergenName').value;
    const response = await fetch(`${apiUrl}/allergens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: allergenName })
    });

    if (response.ok) {
        alert('Allergen added successfully');
    } else {
        alert('Failed to add allergen');
    }
    document.getElementById('allergenName').value = ''; // Clear input
}