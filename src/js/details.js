import { handleErrors, createVendorCards } from './util.mjs';
import { startSlider } from './slider.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const partnersDiv = document.getElementById('partners');

    fetch('http://localhost:3000/api/hotels')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data); // Debug log
            
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data received from API');
            }

            // Extract vendor companies from priceDetails
            const vendors = extractVendors(data);
            partnersDiv.innerHTML = createVendorCards(vendors);
            partnersDiv.classList.remove('loading');

            // Initialize sliders
            const partnerContainer = document.querySelector('#partners').closest('.slider-container');
            startSlider(partnerContainer);
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = `<p class="error">Error loading data: ${error.message}</p>`;
            partnersDiv.innerHTML = errorMessage;
            partnersDiv.classList.remove('loading');
        });
});

function extractVendors(data) {
    const vendors = new Set();

    data.hotels.forEach(hotelGroup => {
        hotelGroup.hotels.forEach(hotel => {
            hotel.priceDetails.forEach(priceDetail => {
                vendors.add(priceDetail.vendor);
            });
        });
    });

    return Array.from(vendors).map(vendor => ({ name: vendor }));
}
