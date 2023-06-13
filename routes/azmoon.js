import express from 'express'
import { createAzmoon, getAzmoon, getAzmoonBySearch, deleteAllAzmoon, getAzmoonBySearchCode, deleteById } from '../controllers/azmoon.js';


const router = express.Router()

router.post('/', createAzmoon)
router.get('/', getAzmoon)
router.get('/search', getAzmoonBySearch)
router.get('/searchById', getAzmoonBySearchCode)
router.delete('/', deleteAllAzmoon)
router.delete('/:id', deleteById)


export default router;