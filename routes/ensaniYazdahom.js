import express from 'express'
import { create, get, getBySearch, deleteAll, getBySearchCode, deleteById, updateById, getSudystatusRouted } from '../controllers/ensaniYazdahom.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', create)
router.post('/updateById', updateById)
router.get('/', get)
router.get('/getSudystatusRouted', getSudystatusRouted)
router.get('/search', getBySearch)
router.get('/searchById', getBySearchCode)
router.delete('/', deleteAll)
router.delete('/:id', deleteById)


export default router;