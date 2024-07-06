import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve index.html
//http://localhost:3000/

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../hotel/index.html'));
});

export default router;
