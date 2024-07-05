const express = require('express');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('styles/json_format.css'));



// Load the service account key JSON content from the .env file
try {
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseURL // Ensure this matches the .env variable name
  });

  // Get a reference to the database service
  const database = admin.database();

  app.get('/api/hotels', async (req, res) => {
    try {
      const hotelsRef = database.ref('hotels');
      const snapshot = await hotelsRef.once('value');
      if (snapshot.exists()) {
        res.json(snapshot.val());
      } else {
        res.json({ message: "No data available" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

} catch (error) {
  console.error('Error parsing SERVICE_ACCOUNT_KEY:', error);
}
