import mongoose from "mongoose"
import ensaniDavazdahom from "../models/ensaniDavazdahom.js";



export const create = async (req, res) => {
    const ensaniGet = req.body;
    let studentId = ensaniGet.studentId
    try {      
        const user = await ensaniDavazdahom.find({studentId})
        if(user.length == 0){
            const newTopic = new ensaniDavazdahom({ ...ensaniGet })
            await newTopic.save();
            res.status(201).json(newTopic)
        }else{
            res.status(201).json({ message: 'exists' })
        }
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const get = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await ensaniDavazdahom.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    
    await ensaniDavazdahom.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await ensaniDavazdahom.findByIdAndRemove(id)
    
}
 

 export const getBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const studentId = searchQuery
        const topics = await ensaniDavazdahom.find({ studentId })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const studentId = searchQuery
        const topics = await ensaniDavazdahom.find({ studentId })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const updateById = async (req, res) => {
    const  obj  = req.body
    let studentId = obj.studentId
    let topicsDetails = obj.topicsDetails
    try {
        const topics = await ensaniDavazdahom.find({ studentId })
        if(topics.length>0){//exists

            await ensaniDavazdahom.updateOne({studentId:studentId},{$set:{
                topicsDetails:topicsDetails
            }})

        }else{
            res.status(200).json({message:'not this user found'})    
        }
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}