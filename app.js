import express from 'express';
import cors from 'cors';
import { initializeFirebase, getHotelsData, getVendorsData } from './src/js/externalConnect.mjs';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});