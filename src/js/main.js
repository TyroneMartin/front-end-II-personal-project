import { handleErrors, createHotelCards, createPartnerCards } from './util.mjs';
import { startSlider } from './slider.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const hotelsDiv = document.getElementById('hotels-data');
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

            // Display top 12 hotels with best rates
            hotelsDiv.innerHTML = createHotelCards(data);
            hotelsDiv.classList.remove('loading');

            // Display top 10 partners
            partnersDiv.innerHTML = createPartnerCards(data.vendors);
            partnersDiv.classList.remove('loading');

            // Initialize sliders
            const hotelContainer = document.querySelector('#hotels-data').closest('.slider-container');
            const partnerContainer = document.querySelector('#partners').closest('.slider-container');

            startSlider(hotelContainer);
            startSlider(partnerContainer);
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = `<p class="error">Error loading data: ${error.message}</p>`;
            hotelsDiv.innerHTML = errorMessage;
            partnersDiv.innerHTML = errorMessage;
            hotelsDiv.classList.remove('loading');
            partnersDiv.classList.remove('loading');
        });
});
