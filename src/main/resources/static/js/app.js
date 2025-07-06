// Main application JavaScript file
const App = {
    // API base URL
    apiBaseUrl: '/api/countries',
    
    // Show notification
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                               type === 'error' ? 'fa-exclamation-circle' : 
                               type === 'warning' ? 'fa-exclamation-triangle' : 
                               'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    },
    
    // Format number with commas
    formatNumber: function(num) {
        if (num === null || num === undefined) return '-';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Format area with units
    formatArea: function(area) {
        if (area === null || area === undefined) return '-';
        return `${this.formatNumber(area)} km²`;
    },
    
    // Format population
    formatPopulation: function(population) {
        if (population === null || population === undefined) return '-';
        if (population >= 1000000) {
            return `${(population / 1000000).toFixed(1)}M`;
        } else if (population >= 1000) {
            return `${(population / 1000).toFixed(1)}K`;
        }
        return this.formatNumber(population);
    },
    
    // Get continent color
    getContinentColor: function(continent) {
        const colors = {
            'Asia': 'yellow',
            'Europe': 'blue',
            'Africa': 'green',
            'North America': 'red',
            'South America': 'purple',
            'Australia': 'orange',
            'Antarctica': 'gray'
        };
        return colors[continent] || 'gray';
    },
    
    // Make API request
    apiRequest: async function(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },
    
    // Load countries data
    loadCountries: async function() {
        try {
            const countries = await this.apiRequest(this.apiBaseUrl);
            return countries;
        } catch (error) {
            this.showNotification('Failed to load countries: ' + error.message, 'error');
            return [];
        }
    },
    
    // Search countries
    searchCountries: async function(query, type = 'name') {
        try {
            const url = type === 'continent' 
                ? `${this.apiBaseUrl}/search/continent?continent=${encodeURIComponent(query)}`
                : `${this.apiBaseUrl}/search/name?name=${encodeURIComponent(query)}`;
            const countries = await this.apiRequest(url);
            return countries;
        } catch (error) {
            this.showNotification('Search failed: ' + error.message, 'error');
            return [];
        }
    },
    
    // Get countries by continent
    getCountriesByContinent: async function(continent) {
        try {
            const countries = await this.apiRequest(`${this.apiBaseUrl}/continent/${encodeURIComponent(continent)}`);
            return countries;
        } catch (error) {
            this.showNotification('Failed to load countries by continent: ' + error.message, 'error');
            return [];
        }
    },
    
    // Create country
    createCountry: async function(countryData) {
        try {
            const country = await this.apiRequest(this.apiBaseUrl, {
                method: 'POST',
                body: JSON.stringify(countryData)
            });
            this.showNotification('Country created successfully!', 'success');
            return country;
        } catch (error) {
            this.showNotification('Failed to create country: ' + error.message, 'error');
            throw error;
        }
    },
    
    // Update country
    updateCountry: async function(id, countryData) {
        try {
            const country = await this.apiRequest(`${this.apiBaseUrl}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(countryData)
            });
            this.showNotification('Country updated successfully!', 'success');
            return country;
        } catch (error) {
            this.showNotification('Failed to update country: ' + error.message, 'error');
            throw error;
        }
    },
    
    // Delete country
    deleteCountry: async function(id) {
        try {
            await this.apiRequest(`${this.apiBaseUrl}/${id}`, {
                method: 'DELETE'
            });
            this.showNotification('Country deleted successfully!', 'success');
            return true;
        } catch (error) {
            this.showNotification('Failed to delete country: ' + error.message, 'error');
            throw error;
        }
    },
    
    // Get country by ID
    getCountryById: async function(id) {
        try {
            const country = await this.apiRequest(`${this.apiBaseUrl}/${id}`);
            return country;
        } catch (error) {
            this.showNotification('Failed to load country: ' + error.message, 'error');
            return null;
        }
    },
    
    // Get statistics
    getStatistics: async function() {
        try {
            const stats = await this.apiRequest(`${this.apiBaseUrl}/statistics`);
            return stats;
        } catch (error) {
            this.showNotification('Failed to load statistics: ' + error.message, 'error');
            return {};
        }
    },
    
    // Initialize the application
    init: function() {
        console.log('Countries App initialized');
        
        // Add global error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.error);
            App.showNotification('An unexpected error occurred', 'error');
        });
        
        // Add unhandled promise rejection handler
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
            App.showNotification('An unexpected error occurred', 'error');
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});

// Export for use in other modules
window.App = App; 