import  Express  from "express"
import {getUsers, userMoshaver, getUserMoshaverById, setStudentForMoshaver, deleteUsers} from '../controllers/userMoshaver.js';

const router = Express.Router()

router.get('/', getUsers)
router.get('/getUserById', getUserMoshaverById)
router.post('/', userMoshaver)
router.patch('/',setStudentForMoshaver)
router.delete('/', deleteUsers)

export default router