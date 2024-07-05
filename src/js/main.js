document.addEventListener('DOMContentLoaded', function() {
    const hotelsDiv = document.getElementById('hotels-data');
  
    fetch('/api/hotels')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            hotelsDiv.innerHTML = JSON.stringify(data, null, 2);
            hotelsDiv.classList.remove('loading');
        })
        .catch(error => {
            console.error('Error:', error);
            hotelsDiv.innerHTML = `<p class="error">Error loading data: ${error.message}</p>`;
            hotelsDiv.classList.remove('loading');
        });
  });