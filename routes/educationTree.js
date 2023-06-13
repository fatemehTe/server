import express from 'express'
import { createEducationTree, getEducationTree, deleteAllEducationTree, deleteById } from '../controllers/educationTree.js';


import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/', createEducationTree)
router.get('/', getEducationTree)
router.delete('/', deleteAllEducationTree)
router.delete('/:id', deleteById)


export default router;