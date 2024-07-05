import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const initializeFirebase = () => {
  try {
    const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.databaseURL
    });
    return admin.database();
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

const getHotelsData = async (database) => {
  try {
    const hotelsRef = database.ref('hotels');
    const snapshot = await hotelsRef.once('value');
    return snapshot.exists() ? snapshot.val() : { message: "No data available" };
  } catch (error) {
    console.error('Error getHotelsData() data:', error);
    throw error;
  }
};

const getVendorsData = async (database) => {
  try {
    const vendorsRef = database.ref('vendor');
    const snapshot = await vendorsRef.once('value');
    return snapshot.exists() ? snapshot.val() : { message: "No data available" };
  } catch (error) {
    console.error('Error getVendorsData() data:', error);
    throw error;
  }
};

export { initializeFirebase, getHotelsData, getVendorsData };
