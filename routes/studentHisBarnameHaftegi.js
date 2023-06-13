import express from 'express'
import { createBarname, getBarname, getBarnameBySearch, deleteAllBarname, getBarnameBySearchCode, deleteById } from '../controllers/studentHisBarnameHaftegi.js';


const router = express.Router()

router.post('/', createBarname)
router.get('/', getBarname)
router.get('/search', getBarnameBySearch)
router.get('/searchById', getBarnameBySearchCode)
router.delete('/', deleteAllBarname)
router.delete('/:id', deleteById)


export default router;