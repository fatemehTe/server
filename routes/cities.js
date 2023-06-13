import express from 'express'
import { createCity, getCities, getCitiesByProvinceId, deleteAllCity, deleteById } from '../controllers/cities.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createCity)
router.get('/', getCities)
router.get('/getCitiesByProvinceId', getCitiesByProvinceId)
router.delete('/', deleteAllCity)
router.delete('/:id', deleteById)


export default router;