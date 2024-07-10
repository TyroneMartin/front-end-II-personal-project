import { handleErrors, createHotelCards } from './util.mjs';
import { startSlider } from './slider.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const hotelsDiv = document.getElementById('hotels-data');

    fetch('https://front-end-ii-personal-project.onrender.com/api/hotels')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text(); // Get the response as text
        })
        .then(text => {
            try {
                const data = JSON.parse(text); // Try to parse the text as JSON
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
            } catch (e) {
                // If parsing fails, it means the response was not JSON
                throw new Error('Invalid JSON response');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = `<p class="error">Error loading data: ${error.message}</p>`;
            hotelsDiv.innerHTML = errorMessage;
            hotelsDiv.classList.remove('loading');
        });
});
