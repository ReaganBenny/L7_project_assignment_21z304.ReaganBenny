// Search Operations
function SearchFlavors() {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const filterSelect = document.getElementById('filter') as HTMLSelectElement;

    // Check if elements are found
    if (!searchInput || !filterSelect) {
        console.error("Search input or filter select element not found.");
        return;
    }

    const searchTerm = searchInput.value;
    const filter = filterSelect.value;

    const flavors = [
        { id: 1, name: 'Vanilla', description: 'A classic flavor', vegan: true, glutenFree: true },
        { id: 2, name: 'Chocolate', description: 'A rich and decadent flavor', vegan: false, glutenFree: true },
        { id: 3, name: 'Strawberry', description: 'A sweet and fruity flavor', vegan: true, glutenFree: true },
    ];

    const filteredFlavors = flavors.filter(flavor => {
        const flavorName = flavor.name.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        if (filter === 'all') {
            return flavorName.includes(lowerCaseSearchTerm);
        } else if (filter === 'vegan') {
            return flavor.vegan && flavorName.includes(lowerCaseSearchTerm);
        } else if (filter === 'gluten-free') {
            return flavor.glutenFree && flavorName.includes(lowerCaseSearchTerm);
        }
        return false; // Default case
    });

    displayFlavors(filteredFlavors);
}

function DisplayFlavors(flavors) {
    const flavorsHtml = document.getElementById('flavors');

    // Check if flavorsHtml is found
    if (!flavorsHtml) {
        console.error("Flavors display element not found.");
        return;
    }

    flavorsHtml.innerHTML = '';

    flavors.forEach(flavor => {
        const flavorHtml = `
            <p>Flavor ID: ${flavor.id}</p>
            <p>Flavor Name: ${flavor.name}</p>
            <p>Description: ${flavor.description}</p>
        `;
        flavorsHtml.innerHTML += flavorHtml;
    });
}