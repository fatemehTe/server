import express from 'express'
import { createTopic, getTopic, getTopicBySearch, deleteAllTopic, getTopicBySearchCode, deleteById } from '../controllers/topicNew.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createTopic)
router.get('/', getTopic)
router.get('/search', getTopicBySearch)
router.get('/searchById', getTopicBySearchCode)
router.delete('/', deleteAllTopic)
router.delete('/:id', deleteById)


export default router;