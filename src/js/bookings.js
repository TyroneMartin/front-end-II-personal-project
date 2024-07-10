import { searchTemplate } from './bookings.mjs';

document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.querySelector('.bookingContainer section');
    searchContainer.innerHTML = searchTemplate; // Ensure only one search bar is added

    const searchForm = document.getElementById('searchForm');
    const hotelResultsDiv = document.getElementById('hotelResults');

    // State predictions
    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho"];
    const locationInput = document.getElementById('location');
    const dataList = document.createElement('datalist');
    dataList.id = 'statesList';
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        dataList.appendChild(option);
    });
    document.body.appendChild(dataList);
    locationInput.setAttribute('list', 'statesList');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const location = document.getElementById('location').value;
        const checkInDate = document.getElementById('checkInDate').value;
        const checkOutDate = document.getElementById('checkOutDate').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        const rooms = document.getElementById('rooms').value;

        if (!location) {
            hotelResultsDiv.innerHTML = '<p>Please enter a valid state.</p>';
            return;
        }

        fetch(`http://localhost:3000/api/hotels?state=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}&children=${children}&rooms=${rooms}`)
            .then(response => response.json())
            .then(data => {
                const filteredHotels = data.hotels.filter(hotelGroup => hotelGroup.state.toLowerCase() === location.toLowerCase());
                
                if (!filteredHotels.length) {
                    hotelResultsDiv.innerHTML = '<p>No hotels found in this state. Please try another location.</p>';
                    return;
                }
                
                hotelResultsDiv.innerHTML = createHotelResults({ hotels: filteredHotels });
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                hotelResultsDiv.innerHTML = '<p>Error loading data. Please try again.</p>';
            });
    });

    function createHotelResults(data) {
        return data.hotels.map(hotelGroup => {
            return hotelGroup.hotels.map(hotel => {
                const lowestPriceDetail = hotel.priceDetails.reduce((lowest, current) => lowest.price < current.price ? lowest : current, hotel.priceDetails[0]);

                return `
                    <div class="hotel-result">
                        <img class="hotel-image" src="${hotel.image}" alt="${hotel.hotelName}">
                        <h4>${hotel.hotelName}</h4>
                        <p>Location: ${hotelGroup.state}</p>
                        <p>Best Price: $${lowestPriceDetail.price}</p>
                        <p>Vendor: <a href="#">${lowestPriceDetail.vendor}</a></p>
                    </div>
                `;
            }).join('');
        }).join('');
    }
});
