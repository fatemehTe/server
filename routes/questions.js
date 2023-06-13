import express from 'express'
import { createQuestion, getQuestionBySearch, getQuestion, deleteAllQuestion } from '../controllers/questions.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createQuestion)
router.get('/search', getQuestionBySearch)
router.get('/', getQuestion)
router.delete('/', deleteAllQuestion)


export default router;