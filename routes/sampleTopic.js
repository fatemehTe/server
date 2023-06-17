import express from 'express'
import { createTopic,getTopic, deleteTopic, getTopicById } from '../controllers/sampleTopic.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createTopic)
router.get('/', getTopic)
router.get('/byId', getTopicById)
router.delete('/', deleteTopic)



export default router;