import  Express  from "express"
import {signin, signup, getUsers} from '../controllers/user.js';

const router = Express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
// router.get('/', getUsers)

export default router