import mongoose from "mongoose"
import topic from "../models/topic.js";



export const createTopic = async (req, res) => {
    const topicGet = req.body;
    try {
        for (let i=0;i<topicGet.length;i++) {
            const newTopic = new topic({ ...topicGet[i] })
            await newTopic.save();
        }
        res.status(201).json(newTopic)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getTopic = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await topic.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllTopic = async (req, res) => {
    
    await topic.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await topic.findByIdAndRemove(id)
    
}
 

 export const getTopicBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const topics = await topic.find({ Title })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getTopicBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Id = searchQuery
        const topics = await topic.find({ Id })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}