import express from 'express';
import homeRoutes from './home.js';
import searchHotelsRoutes from './search-hotels.js';
import userRoutes from './user.js';

const router = express.Router();

router.use('/', homeRoutes);
router.use('/search-hotels', searchHotelsRoutes);
router.use('/user', userRoutes);

export default router;