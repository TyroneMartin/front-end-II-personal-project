import { handleErrors, createHotelCards, createPartnerCards } from './util.mjs';
import { startSlider } from './slider.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const hotelsDiv = document.getElementById('hotels-data');
    const partnersDiv = document.getElementById('partners');

    fetch('http://localhost:3000/api/hotels')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data); // Debug log
            
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data received from API');
            }

            // Display top 12 hotels with best rates
            if (Array.isArray(data.hotels)) {
                hotelsDiv.innerHTML = createHotelCards(data.hotels);
            } else {
                hotelsDiv.innerHTML = '<p>No hotel data available</p>';
            }
            hotelsDiv.classList.remove('loading');

            // Display top 10 partners
            if (data.vendors && typeof data.vendors === 'object') {
                partnersDiv.innerHTML = createPartnerCards(data.vendors);
            } else {
                partnersDiv.innerHTML = '<p>No partner data available</p>';
            }
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
