const handleErrors = (err, res) => {
    console.error(err);
    res.status(500).json({ error: err.message });
};

function createHotelCards(data) {
    if (!Array.isArray(data.hotels) || data.hotels.length === 0) {
        console.error('Invalid or empty hotels data:', data.hotels);
        return '<p>No hotel data available</p>';
    }

    // Flatten the hotels array and include state information
    const allHotels = data.hotels.flatMap(group => 
        group.hotels.map(hotel => ({
            ...hotel,
            state: group.state
        }))
    );

    // Sort hotels by lowest price from priceDetails
    const sortedHotels = allHotels.sort((a, b) => {
        const aLowestPrice = Math.min(...(a.priceDetails?.map(pd => pd.price) || [Infinity]));
        const bLowestPrice = Math.min(...(b.priceDetails?.map(pd => pd.price) || [Infinity]));
        return aLowestPrice - bLowestPrice;
    });

    // Take top 12 hotels
    return sortedHotels.slice(0, 12).map(hotel => {
        const lowestPrice = Math.min(...(hotel.priceDetails?.map(pd => pd.price) || [0]));
        return `
            <section class="hotel-card">
                <h3>${hotel.hotelName || 'Unknown Hotel'}</h3>
                <p>Location: ${hotel.state || 'N/A'}</p>
                <p>Best Price: $${lowestPrice || 0}</p>
            </section>
        `;
    }).join('');
}

function createPartnerCards(vendors) {
    if (typeof vendors !== 'object' || vendors === null) {
        console.error('Invalid vendors data:', vendors);
        return '<p>No partner data available</p>';
    }

    const vendorNames = Object.keys(vendors).slice(0, 10);
    return vendorNames.map(name => `
        <section class="vendor-card">
            <h3>${name}</h3>
        </section>
    `).join('');
}

export { handleErrors, createHotelCards, createPartnerCards };
