const handleErrors = (err, res) => {
    console.error(err);
    res.status(500).json({ error: err.message });
  };
  
  function createHotelCards(hotels) {
    if (!Array.isArray(hotels) || hotels.length === 0) {
        console.error('Invalid or empty hotels data:', hotels);
        return '<p>No hotel data available</p>';
    }
  
    // Sort hotels by lowest price
    const sortedHotels = hotels.sort((a, b) => {
        const aLowestPrice = Math.min(...(a.priceDetails?.map(pd => pd.price) || [Infinity]));
        const bLowestPrice = Math.min(...(b.priceDetails?.map(pd => pd.price) || [Infinity]));
        return aLowestPrice - bLowestPrice;
    });
  
    // Take top 12 hotels
    return sortedHotels.slice(0, 12).map(hotel => `
        <section class="hotel-card">
            <h3>${hotel.hotels.hotelName || 'Unknown Hotel'}</h3>
            <p>Location: ${hotel.location || 'N/A'}</p>
            <p>Best Price: $${Math.min(...(hotel.priceDetails?.map(pd => pd.price) || [0]))}</p>
        </section>
    `).join('');
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