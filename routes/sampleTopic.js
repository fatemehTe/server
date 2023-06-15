import express from 'express'
import { createTopic,getTopic, deleteTopic } from '../controllers/sampleTopic.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createTopic)
router.get('/', getTopic)
router.delete('/', deleteTopic)



export default router;