import express from 'express'
import { create, get, getBySearch, deleteAll, getBySearchCode, deleteById, updateById,ReportStIdantTopicId, getSudystatusRouted } from '../controllers/tajrobiYazdahom.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', create)
router.post('/updateById', updateById)
router.get('/', get)
router.get('/getSudystatusRouted', getSudystatusRouted)
router.get('/ReportStIdantTopicId',ReportStIdantTopicId)
router.get('/search', getBySearch)
router.get('/searchById', getBySearchCode)
router.delete('/', deleteAll)
router.delete('/:id', deleteById)


export default router;