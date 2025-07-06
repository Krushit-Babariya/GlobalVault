// Add Country page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addCountryForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Handle form submission
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const countryData = {
            name: formData.get('name').trim(),
            continent: formData.get('continent'),
            capital: formData.get('capital').trim() || null,
            population: formData.get('population') ? parseInt(formData.get('population')) : null,
            area: formData.get('area') ? parseFloat(formData.get('area')) : null,
            currency: formData.get('currency').trim() || null,
            language: formData.get('language').trim() || null
        };
        
        // Validate required fields
        if (!countryData.name) {
            App.showNotification('Country name is required', 'error');
            return;
        }
        
        if (!countryData.continent) {
            App.showNotification('Continent is required', 'error');
            return;
        }
        
        try {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...';
            submitBtn.disabled = true;
            
            // Create country
            const newCountry = await App.createCountry(countryData);
            
            // Reset form
            form.reset();
            
            // Show success message and redirect
            setTimeout(() => {
                window.location.href = '/countries';
            }, 1500);
            
        } catch (error) {
            console.error('Failed to create country:', error);
        } finally {
            // Reset button state
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-save mr-2"></i>Save Country';
            submitBtn.disabled = false;
        }
    }
    
    // Add real-time validation
    addFormValidation();
});

// Add form validation
function addFormValidation() {
    const nameInput = document.getElementById('name');
    const continentSelect = document.getElementById('continent');
    const populationInput = document.getElementById('population');
    const areaInput = document.getElementById('area');
    
    // Name validation
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length < 2) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-300');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
    }
    
    // Population validation
    if (populationInput) {
        populationInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (this.value && (isNaN(value) || value < 0)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-300');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
    }
    
    // Area validation
    if (areaInput) {
        areaInput.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (this.value && (isNaN(value) || value < 0)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-300');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
    }
}

// Fill sample data function (called from HTML)
function fillSampleData(name, continent, capital, population, area, currency, language) {
    const form = document.getElementById('addCountryForm');
    if (!form) return;
    
    // Fill form fields
    const nameInput = document.getElementById('name');
    const continentSelect = document.getElementById('continent');
    const capitalInput = document.getElementById('capital');
    const populationInput = document.getElementById('population');
    const areaInput = document.getElementById('area');
    const currencyInput = document.getElementById('currency');
    const languageInput = document.getElementById('language');
    
    if (nameInput) nameInput.value = name;
    if (continentSelect) continentSelect.value = continent;
    if (capitalInput) capitalInput.value = capital;
    if (populationInput) populationInput.value = population;
    if (areaInput) areaInput.value = area;
    if (currencyInput) currencyInput.value = currency;
    if (languageInput) languageInput.value = language;
    
    // Show notification
    App.showNotification(`Pre-filled form with ${name} data`, 'info');
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

// Auto-save draft functionality
let autoSaveTimer;

function setupAutoSave() {
    const form = document.getElementById('addCountryForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                saveDraft();
            }, 2000); // Save draft after 2 seconds of inactivity
        });
    });
}

function saveDraft() {
    const form = document.getElementById('addCountryForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const draft = {};
    
    for (let [key, value] of formData.entries()) {
        if (value.trim()) {
            draft[key] = value;
        }
    }
    
    if (Object.keys(draft).length > 0) {
        localStorage.setItem('countryDraft', JSON.stringify(draft));
        console.log('Draft saved');
    }
}

function loadDraft() {
    const draft = localStorage.getItem('countryDraft');
    if (!draft) return;
    
    try {
        const draftData = JSON.parse(draft);
        const form = document.getElementById('addCountryForm');
        if (!form) return;
        
        Object.keys(draftData).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = draftData[key];
            }
        });
        
        App.showNotification('Draft loaded', 'info');
    } catch (error) {
        console.error('Failed to load draft:', error);
    }
}

function clearDraft() {
    localStorage.removeItem('countryDraft');
    console.log('Draft cleared');
}

// Initialize auto-save when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupAutoSave();
    
    // Check for draft on page load
    if (localStorage.getItem('countryDraft')) {
        if (confirm('You have a saved draft. Would you like to load it?')) {
            loadDraft();
        } else {
            clearDraft();
        }
    }
});

// Clear draft when form is successfully submitted
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addCountryForm');
    if (form) {
        form.addEventListener('submit', function() {
            clearDraft();
        });
    }
}); 