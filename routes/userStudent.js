import  Express  from "express"
import {userStudent, getUsers, getUserStudentById, getUserStudentByIds, deleteUsers, getReshteIdByStudentId} from '../controllers/userStudent.js';

const router = Express.Router()

router.post('/', userStudent)
router.get('/', getUsers)
router.get('/getUserById', getUserStudentById)
router.get('/getUserByIds', getUserStudentByIds)
router.get('/getReshteIdByStudentId', getReshteIdByStudentId)
router.delete('/', deleteUsers)

export default router