import mongoose from "mongoose"
import topicGrandChild from "../models/topicGrandChild.js";



export const createTopic = async (req, res) => {
    const topicGet = req.body;
    try {
        for (let i=0;i<topicGet.length;i++) {
            let Id = topicGet[i].Id
            const exixt = await topicGrandChild.find({Id})
            if(exixt.length==0){
                const newTopic = new topicGrandChild({ ...topicGet[i] })
                await newTopic.save();
            }else{
                res.status(201).json({message:'existed'})
            }
        }
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getTopic = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await topicGrandChild.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllTopic = async (req, res) => {
    
    await topicGrandChild.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await topicGrandChild.findByIdAndRemove(id)
    
}
 

 export const getTopicBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const topics = await topicGrandChild.find({ Title })
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
        const topics = await topicGrandChild.find({ Id })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}