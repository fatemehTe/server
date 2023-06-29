import mongoose from "mongoose"
import sampleTopicPrivate from "../models/sampleTopicPrivate.js";


export const getTopicById = async (req, res) => {
    const  {searchQuery}  = req.query
    let code = searchQuery
    // return res.status(400).json({message:code})
    try {
        const user = await sampleTopicPrivate.find({code})
        if(user.length == 0){
            res.status(400).json({message:'not found'})
        }else{
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const createTopic = async (req, res) => {
    const topicGet = req.body;
    let code = topicGet.code
    try {      
        const user = await sampleTopicPrivate.find({code})
        if(user.length == 0){
            const newTopic = new sampleTopicPrivate({ ...topicGet })
            await newTopic.save();
            res.status(201).json(newTopic)
        }else{
            res.status(201).json({ message: 'exists' })
        }
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const getTopic = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await sampleTopicPrivate.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: 'wrong' })
    }
}
export const deleteTopic = async (req, res) => {
    try {
        await sampleTopicPrivate.deleteMany({})
        res.status(200).json({message:'deleted'})
    } catch (error) {
        res.status(404).json({ message: 'not deleted' })
    }
    
}
