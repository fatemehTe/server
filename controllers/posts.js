import mongoose from "mongoose"
import postMessage from "../models/postMessage.js"

export const getPosts = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const postMessages = await postMessage.find()
        console.log(postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
//Query=> /posts?page=1 => page =1
//Params=> /posts/123 => id=123
//"i" is ignore case
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, "i")
        const posts = await postMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
        res.json({ data: posts })
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createPost = async (req, res) => {
    // res.send('CREATE WORKS!')
    const post = req.body;
    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with this Id')
    const updatedPost = await postMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this Id')
    await postMessage.findByIdAndRemove(id)
    res.json('post deleted successfully')
}

export const likePost = async (req, res) => {
    const { id } = req.params
    //we have used auth middleware already so now we have access to req.userId in the likePost controller
    if (!req.userId) return res.json({ message: 'unAuthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this Id')
    const post = await postMessage.findById(id)
    //finding if the user has liked the post or not (likes has user indexes)
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        //this user hasnt like the post
        //like this post
        //call back loop throught the ids
        post.likes.push(req.userId)
    } else {
        //dislike the post (get the like back)
        //call back loop throught the ids
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}

