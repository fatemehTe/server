import express from 'express'
import { createTopic,getTopic, deleteTopic, getTopicById, deleteTopicByCode } from '../controllers/sampleTopicGrand.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createTopic)
router.get('/', getTopic)
router.get('/byId', getTopicById)
router.delete('/', deleteTopic)
router.delete('/:code', deleteTopicByCode)



export default router;