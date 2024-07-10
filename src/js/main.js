import { handleErrors, createHotelCards } from './util.mjs';
import { startSlider } from './slider.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const hotelsDiv = document.getElementById('hotels-data');

<<<<<<< HEAD
    fetch('https://front-end-ii-personal-project.onrender.com/api/hotels')
=======
    fetch('https://front-end-ii-personal-project.onrender.com')
>>>>>>> 8394ddedfcdeaa4500d4081aac25a6bb17a98dde
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

            // Initialize sliders
            const hotelContainer = document.querySelector('#hotels-data').closest('.slider-container');

            startSlider(hotelContainer);
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = `<p class="error">Error loading data: ${error.message}</p>`;
            hotelsDiv.innerHTML = errorMessage;
            hotelsDiv.classList.remove('loading');
        });
});
