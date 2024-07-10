import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeFirebase, getHotelsData, getVendorsData } from './src/js/externalConnect.mjs';
import routes from './src/routes/index.js';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Initialize Firebase
const database = initializeFirebase();

app.get('/api/hotels', async (req, res) => {
  try {
    const hotelsData = await getHotelsData(database);
    const vendorsData = await getVendorsData(database);
    res.json({ hotels: hotelsData, vendors: vendorsData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use the routes defined in routes.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
