document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const hotelResultsDiv = document.getElementById('hotelResults');

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
                if (!data.hotels || data.hotels.length === 0) {
                    hotelResultsDiv.innerHTML = '<p>No hotels found in this state. Please try another location.</p>';
                    return;
                }
                hotelResultsDiv.innerHTML = createHotelResults(data);
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
