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

        fetch(`http://localhost:3000/api/hotels?location=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}&children=${children}&rooms=${rooms}`)
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data);
                hotelResultsDiv.innerHTML = createHotelResults(data);
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                hotelResultsDiv.innerHTML = '<p>Error loading data. Please try again.</p>';
            });
    });

    function createHotelResults(data) {
        if (!data.hotels || data.hotels.length === 0) {
            return '<p>No results found.</p>';
        }

        return data.hotels.map(hotelGroup => {
            return hotelGroup.hotels.map(hotel => {
                const lowestPriceDetail = hotel.priceDetails.reduce((lowest, current) => {
                    return current.price < lowest.price ? current : lowest;
                }, hotel.priceDetails[0]);

                return `
                    <div class="hotel-result">
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
