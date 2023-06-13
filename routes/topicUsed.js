import express from 'express'
import { createTopic, getTopic, pushIntoTopics,updateTopicsNextStatus,getTopicByStudentIdAndTiocId, getTopicBySearch, deleteAllTopic, getTopicBySearchCode, deleteById } from '../controllers/topicUsed.js';

const router = express.Router()

router.post('/', createTopic)

router.post('/pushIntoTopics', pushIntoTopics)
router.post('/updateTopicsNextStatus', updateTopicsNextStatus)
router.get('/', getTopic)
router.get('/search', getTopicBySearch)
router.get('/searchById', getTopicBySearchCode)
router.get('/getTopicByStudentIdAndTiocId', getTopicByStudentIdAndTiocId)
router.delete('/', deleteAllTopic)
router.delete('/:id', deleteById)


export default router;