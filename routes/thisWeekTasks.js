import express from 'express'
import { create, pushIntoTasks, get, deleteAll, deleteById, getReportByStudentAndMoshaverIdAndStartDate } from '../controllers/thisWeekTasks.js';

const router = express.Router()

router.post('/', create)
router.post('/pushIntoTasks', pushIntoTasks)
router.get('/', get)
router.get('/getReportByStudentAndMoshaverIdAndStartDate', getReportByStudentAndMoshaverIdAndStartDate)
router.delete('/', deleteAll)
router.delete('/:id', deleteById)


export default router;