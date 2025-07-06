// Countries page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchName');
    const filterSelect = document.getElementById('filterContinent');
    const searchBtn = document.getElementById('searchBtn');
    const countriesTableBody = document.getElementById('countriesTableBody');
    
    let allCountries = [];
    let filteredCountries = [];
    
    // Load initial data
    loadCountriesData();
    
    // Event listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', performSearch);
    }
    
    // Load countries data
    async function loadCountriesData() {
        try {
            allCountries = await App.loadCountries();
            filteredCountries = [...allCountries];
            renderCountriesTable();
        } catch (error) {
            console.error('Failed to load countries:', error);
        }
    }
    
    // Perform search and filter
    async function performSearch() {
        const searchTerm = searchInput ? searchInput.value.trim() : '';
        const selectedContinent = filterSelect ? filterSelect.value : '';
        
        try {
            let results = [...allCountries];
            
            // Filter by continent if selected
            if (selectedContinent) {
                results = results.filter(country => 
                    country.continent.toLowerCase() === selectedContinent.toLowerCase()
                );
            }
            
            // Search by name if provided
            if (searchTerm) {
                results = results.filter(country => 
                    country.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            filteredCountries = results;
            renderCountriesTable();
            
        } catch (error) {
            console.error('Search failed:', error);
        }
    }
    
    // Render countries table
    function renderCountriesTable() {
        if (!countriesTableBody) return;
        
        if (filteredCountries.length === 0) {
            countriesTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <p class="text-lg">No countries found</p>
                        <p class="text-sm">Try adjusting your search criteria</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        countriesTableBody.innerHTML = filteredCountries.map(country => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <i class="fas fa-flag text-primary-600"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${country.name}</div>
                            <div class="text-sm text-gray-500">${country.language || 'N/A'}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContinentBadgeClass(country.continent)}">
                        ${country.continent}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${country.capital || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${App.formatPopulation(country.population)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${App.formatArea(country.area)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${country.currency || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="viewCountry(${country.id})" class="text-primary-600 hover:text-primary-900" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editCountry(${country.id})" class="text-yellow-600 hover:text-yellow-900" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteCountry(${country.id})" class="text-red-600 hover:text-red-900" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    // Get continent badge class
    function getContinentBadgeClass(continent) {
        const classes = {
            'Asia': 'bg-yellow-100 text-yellow-800',
            'Europe': 'bg-blue-100 text-blue-800',
            'Africa': 'bg-green-100 text-green-800',
            'North America': 'bg-red-100 text-red-800',
            'South America': 'bg-purple-100 text-purple-800',
            'Australia': 'bg-orange-100 text-orange-800',
            'Antarctica': 'bg-gray-100 text-gray-800'
        };
        return classes[continent] || 'bg-gray-100 text-gray-800';
    }
});

// Global functions for CRUD operations

// View country details
async function viewCountry(id) {
    try {
        const country = await App.getCountryById(id);
        if (country) {
            showCountryModal(country, 'view');
        }
    } catch (error) {
        console.error('Failed to load country:', error);
    }
}

// Edit country
async function editCountry(id) {
    try {
        const country = await App.getCountryById(id);
        if (country) {
            showCountryModal(country, 'edit');
        }
    } catch (error) {
        console.error('Failed to load country for editing:', error);
    }
}

// Delete country
async function deleteCountry(id) {
    if (confirm('Are you sure you want to delete this country? This action cannot be undone.')) {
        try {
            await App.deleteCountry(id);
            // Reload the page to refresh the table
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete country:', error);
        }
    }
}

// Show country modal
function showCountryModal(country, mode = 'view') {
    const modal = document.getElementById('countryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    modalTitle.textContent = mode === 'edit' ? 'Edit Country' : 'Country Details';
    
    if (mode === 'view') {
        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Country Name</label>
                        <p class="mt-1 text-sm text-gray-900">${country.name}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Continent</label>
                        <p class="mt-1 text-sm text-gray-900">${country.continent}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Capital</label>
                        <p class="mt-1 text-sm text-gray-900">${country.capital || 'N/A'}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Population</label>
                        <p class="mt-1 text-sm text-gray-900">${App.formatPopulation(country.population)}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Area</label>
                        <p class="mt-1 text-sm text-gray-900">${App.formatArea(country.area)}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Currency</label>
                        <p class="mt-1 text-sm text-gray-900">${country.currency || 'N/A'}</p>
                    </div>
                    <div class="col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Language</label>
                        <p class="mt-1 text-sm text-gray-900">${country.language || 'N/A'}</p>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button onclick="closeModal()" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Close
                    </button>
                    <button onclick="editCountry(${country.id})" class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700">
                        Edit
                    </button>
                </div>
            </div>
        `;
    } else {
        modalContent.innerHTML = `
            <form id="editCountryForm" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="editName" class="block text-sm font-medium text-gray-700">Country Name</label>
                        <input type="text" id="editName" name="name" value="${country.name}" required
                               class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="editContinent" class="block text-sm font-medium text-gray-700">Continent</label>
                        <select id="editContinent" name="continent" required
                                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option value="Asia" ${country.continent === 'Asia' ? 'selected' : ''}>Asia</option>
                            <option value="Europe" ${country.continent === 'Europe' ? 'selected' : ''}>Europe</option>
                            <option value="Africa" ${country.continent === 'Africa' ? 'selected' : ''}>Africa</option>
                            <option value="North America" ${country.continent === 'North America' ? 'selected' : ''}>North America</option>
                            <option value="South America" ${country.continent === 'South America' ? 'selected' : ''}>South America</option>
                            <option value="Australia" ${country.continent === 'Australia' ? 'selected' : ''}>Australia</option>
                            <option value="Antarctica" ${country.continent === 'Antarctica' ? 'selected' : ''}>Antarctica</option>
                        </select>
                    </div>
                    <div>
                        <label for="editCapital" class="block text-sm font-medium text-gray-700">Capital</label>
                        <input type="text" id="editCapital" name="capital" value="${country.capital || ''}"
                               class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="editPopulation" class="block text-sm font-medium text-gray-700">Population</label>
                        <input type="number" id="editPopulation" name="population" value="${country.population || ''}" min="0"
                               class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="editArea" class="block text-sm font-medium text-gray-700">Area (km²)</label>
                        <input type="number" id="editArea" name="area" value="${country.area || ''}" min="0" step="0.01"
                               class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="editCurrency" class="block text-sm font-medium text-gray-700">Currency</label>
                        <input type="text" id="editCurrency" name="currency" value="${country.currency || ''}"
                               class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                    <div>
                        <label for="editLanguage" class="block text-sm font-medium text-gray-700">Language</label>
                        <input type="text" id="editLanguage" name="language" value="${country.language || ''}"
                               class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    </div>
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" onclick="closeModal()" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700">
                        Save Changes
                    </button>
                </div>
            </form>
        `;
        
        // Add form submit handler
        document.getElementById('editCountryForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            await updateCountryFromForm(country.id);
        });
    }
    
    modal.classList.remove('hidden');
}

// Update country from form
async function updateCountryFromForm(id) {
    const form = document.getElementById('editCountryForm');
    const formData = new FormData(form);
    
    const countryData = {
        name: formData.get('name'),
        continent: formData.get('continent'),
        capital: formData.get('capital') || null,
        population: formData.get('population') ? parseInt(formData.get('population')) : null,
        area: formData.get('area') ? parseFloat(formData.get('area')) : null,
        currency: formData.get('currency') || null,
        language: formData.get('language') || null
    };
    
    try {
        await App.updateCountry(id, countryData);
        closeModal();
        window.location.reload();
    } catch (error) {
        console.error('Failed to update country:', error);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('countryModal');
    if (modal) {
        modal.classList.add('hidden');
    }
} 