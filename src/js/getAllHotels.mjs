import { createAllHotelCards } from './util.mjs';

async function fetchHotelsData() {
    try {
        const response = await fetch('/api/hotels');
        const data = await response.json();
        const hotelCardsHtml = createAllHotelCards(data);
        document.getElementById('allHotels-data').innerHTML = hotelCardsHtml;
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        document.getElementById('allHotels-data').innerHTML = '<p>Error loading hotel data</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchHotelsData);