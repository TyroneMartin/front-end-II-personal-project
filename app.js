import express from 'express';
import { initializeFirebase, getHotelsData } from './src/js/externalConnect.mjs';
import { handleErrors } from './src/util.js';

const app = express();
const port = 3000;

const database = initializeFirebase();

app.get('/api/hotels', async (req, res) => {
  try {
    const data = await getHotelsData(database);
    res.json(data);
  } catch (error) {
    handleErrors(error, res);
  }
});

// localhost:3000/api/hotels
app.use('/api', express.static('public'));
app.use('/', express.static('routes'));



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});