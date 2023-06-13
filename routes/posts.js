import express from 'express'
import {getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';


import auth from '../middleware/auth.js';

//scince we are in posts.js file, all the routes begin with /post...

const router = express.Router()
//all the users can see all the posts so no need o auth

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.post('/',auth, createPost)
//we have used auth middleware already so now we have access to req.userId in the likePost controller
router.patch('/:id/likePost',auth ,likePost)
router.patch('/:id',auth, updatePost)
router.delete('/:id',auth ,deletePost)



export default router;