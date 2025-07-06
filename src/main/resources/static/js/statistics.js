// Statistics page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts when page loads
    initializeCharts();
    
    // Load real-time statistics
    loadRealTimeStats();
});

// Initialize charts
function initializeCharts() {
    const continentChartCanvas = document.getElementById('continentChart');
    if (continentChartCanvas) {
        createContinentChart(continentChartCanvas);
    }
}

// Create continent distribution chart
function createContinentChart(canvas) {
    // Get data from the page (passed from Thymeleaf)
    const continentData = window.continentData || [];
    const totalCountries = window.totalCountries || 0;
    
    if (continentData.length === 0) {
        // Show placeholder if no data
        canvas.parentElement.innerHTML = `
            <div class="flex items-center justify-center h-64 text-gray-500">
                <div class="text-center">
                    <i class="fas fa-chart-pie text-4xl mb-4"></i>
                    <p>No data available</p>
                </div>
            </div>
        `;
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Prepare chart data
    const labels = continentData.map(item => item[0]);
    const data = continentData.map(item => item[1]);
    const colors = continentData.map(item => getContinentColor(item[0]));
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const percentage = ((value / totalCountries) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

// Get continent color
function getContinentColor(continent) {
    const colors = {
        'Asia': '#fbbf24',
        'Europe': '#3b82f6',
        'Africa': '#10b981',
        'North America': '#ef4444',
        'South America': '#8b5cf6',
        'Australia': '#f97316',
        'Antarctica': '#6b7280'
    };
    return colors[continent] || '#6b7280';
}

// Load real-time statistics
async function loadRealTimeStats() {
    try {
        const stats = await App.getStatistics();
        updateStatisticsDisplay(stats);
    } catch (error) {
        console.error('Failed to load real-time statistics:', error);
    }
}

// Update statistics display
function updateStatisticsDisplay(stats) {
    // Update total countries
    const totalCountriesElement = document.querySelector('[data-stat="totalCountries"]');
    if (totalCountriesElement && stats.totalCountries !== undefined) {
        totalCountriesElement.textContent = stats.totalCountries;
    }
    
    // Update continents count
    const continentsElement = document.querySelector('[data-stat="continents"]');
    if (continentsElement && stats.continents) {
        continentsElement.textContent = stats.continents.length;
    }
    
    // Update data points
    const dataPointsElement = document.querySelector('[data-stat="dataPoints"]');
    if (dataPointsElement && stats.totalCountries !== undefined) {
        dataPointsElement.textContent = stats.totalCountries * 7;
    }
}

// Refresh statistics
function refreshStatistics() {
    const refreshBtn = document.querySelector('[data-action="refresh-stats"]');
    if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Refreshing...';
        refreshBtn.disabled = true;
    }
    
    loadRealTimeStats().finally(() => {
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>Refresh';
            refreshBtn.disabled = false;
        }
    });
}

// Export statistics
function exportStatistics() {
    const exportBtn = document.querySelector('[data-action="export-stats"]');
    if (exportBtn) {
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Exporting...';
        exportBtn.disabled = true;
    }
    
    // Get current statistics
    const stats = {
        totalCountries: window.totalCountries || 0,
        continents: window.continents || [],
        countriesByContinent: window.continentData || [],
        exportDate: new Date().toISOString()
    };
    
    // Create CSV content
    const csvContent = createCSVContent(stats);
    
    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `countries-statistics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    if (exportBtn) {
        exportBtn.innerHTML = '<i class="fas fa-download mr-2"></i>Export';
        exportBtn.disabled = false;
    }
    
    App.showNotification('Statistics exported successfully!', 'success');
}

// Create CSV content
function createCSVContent(stats) {
    let csv = 'Continent,Country Count,Percentage\n';
    
    const totalCountries = stats.totalCountries;
    stats.countriesByContinent.forEach(item => {
        const continent = item[0];
        const count = item[1];
        const percentage = ((count / totalCountries) * 100).toFixed(1);
        csv += `"${continent}",${count},${percentage}%\n`;
    });
    
    return csv;
}

// Add event listeners for action buttons
document.addEventListener('DOMContentLoaded', function() {
    // Refresh button
    const refreshBtn = document.querySelector('[data-action="refresh-stats"]');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshStatistics);
    }
    
    // Export button
    const exportBtn = document.querySelector('[data-action="export-stats"]');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportStatistics);
    }
    
    // Auto-refresh every 30 seconds
    setInterval(() => {
        loadRealTimeStats();
    }, 30000);
});

// Add smooth animations for statistics cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add hover effects for continent cards
document.addEventListener('DOMContentLoaded', function() {
    const continentCards = document.querySelectorAll('[th\\:each="continent : ${continents}"]');
    
    continentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + R to refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshStatistics();
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportStatistics();
    }
});

// Add progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.bg-primary-600.h-2.rounded-full');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
}); 