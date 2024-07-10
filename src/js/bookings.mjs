const searchTemplate = `
<form id="searchForm">
    <div class="search-box">
        <input type="text" id="location" placeholder="Enter State?" required>
        <input type="date" id="checkInDate" placeholder="Check-in Date" required>
        <input type="date" id="checkOutDate" title="Check-out Date" required>
        <input type="number" id="adults" placeholder="Adults" min="1" required>
        <input type="number" id="children" placeholder="Children" min="0">
        <input type="number" id="rooms" placeholder="Rooms" min="1" required>
        <button type="submit">Search</button>
    </div>
</form>
`;

export { searchTemplate };
