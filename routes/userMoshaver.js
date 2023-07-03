import  Express  from "express"
import {getUsers, userMoshaver, getUserMoshaverById, setStudentForMoshaver, deleteUsers, getUserMoshaverByStId} from '../controllers/userMoshaver.js';

const router = Express.Router()

router.get('/', getUsers)
router.get('/getUserById', getUserMoshaverById)
router.get('/getUserByStId', getUserMoshaverByStId)
router.post('/', userMoshaver)
router.patch('/',setStudentForMoshaver)
router.delete('/', deleteUsers)

export default router