import express from 'express'
import { createBarname, getBarname, getBarnameBySearch, deleteAllBarname, getBarnameByStudentIdAndThisWeek, getBarnameByStudentId, deleteById } from '../controllers/studentAuthorityBarnameHaftegi.js';


const router = express.Router()

router.post('/', createBarname)
router.get('/', getBarname)
router.get('/search', getBarnameBySearch)
router.get('/searchById', getBarnameByStudentId)
router.get('/searchByIdAndThisWeek', getBarnameByStudentIdAndThisWeek)
router.delete('/', deleteAllBarname)
router.delete('/:id', deleteById)


export default router;