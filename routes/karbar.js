import  Express  from "express"
import {signin, signup, getUsers, getUsersById} from '../controllers/karbar.js';

const router = Express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/', getUsers)
router.get('/byId', getUsersById)

export default router