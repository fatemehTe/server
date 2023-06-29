import  Express  from "express"
import {signin, signup, getUsers, getUsersById, deleteAll} from '../controllers/karbar.js';

const router = Express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/', getUsers)
router.get('/byId', getUsersById)
router.delete('/', deleteAll)

export default router