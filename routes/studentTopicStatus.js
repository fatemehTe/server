import express from 'express'
import { createStudentTopic, getStudentTopic, getStudentTopicBySearch, deleteAllStudentTopic, getStudentTopicBySearchCode, deleteById } from '../controllers/studentTopicStatus.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createStudentTopic)
router.get('/', getStudentTopic)
router.get('/search', getStudentTopicBySearch)
router.get('/searchById', getStudentTopicBySearchCode)
router.delete('/', deleteAllStudentTopic)
router.delete('/:id', deleteById)


export default router;