import express from 'express'
import { createProvince, getProvinces, deleteAll } from '../controllers/provinces.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createProvince)
router.get('/', getProvinces)
router.delete('/',deleteAll)

export default router;