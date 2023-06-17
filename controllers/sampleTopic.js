import mongoose from "mongoose"
import sampleTopic from "../models/sampleTopic.js";


export const getTopicById = async (req, res) => {
    const { searchQuery } = req.query
    return res.status(200).json(searchQuery)
    // return res.status(200).json({msg:searchQuery})
    let returnArray = []
    try {
        for(let i=0;i<searchQuery.length;i++){
            const Id = searchQuery[i]
            const obj = await sampleTopic.find({ Id })
            obj?returnArray.push(obj):''
        }
        res.status(200).json(returnArray)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createTopic = async (req, res) => {
    const topicGet = req.body;
    try {
        for (let i=0;i<topicGet.length;i++) {
            const newTopic = new sampleTopic({ ...topicGet[i] })
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
        const topicGet = await sampleTopic.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const deleteTopic = async (req, res) => {
    try {
        await sampleTopic.deleteMany({})
        res.status(200).json({message:'deleted'})
    } catch (error) {
        res.status(404).json({ message: 'not deleted' })
    }
    
}
