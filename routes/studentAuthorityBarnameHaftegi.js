import express from 'express'
import { createBarname, getBarname, getBarnameBySearch, deleteAllBarname, UpdateBarnameBySTIdMoshIdStartDate, getBarnameByStudentIdAndThisWeek, getBarnameByStudentId, deleteById, UpdateBarnameBySTIdMoshIdStartDateForFinish } from '../controllers/studentAuthorityBarnameHaftegi.js';


const router = express.Router()

router.post('/', createBarname)
router.post('/bySTIdMoshIdStartWeek',UpdateBarnameBySTIdMoshIdStartDate )
router.post('/bySTIdMoshIdStartWeekForFinish',UpdateBarnameBySTIdMoshIdStartDateForFinish )
router.get('/', getBarname)
router.get('/search', getBarnameBySearch)
router.get('/searchById', getBarnameByStudentId)
router.get('/searchByIdAndThisWeek', getBarnameByStudentIdAndThisWeek)
router.delete('/', deleteAllBarname)
router.delete('/:id', deleteById)


export default router;