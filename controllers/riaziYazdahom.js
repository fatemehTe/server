import mongoose from "mongoose"
import riaziYazdahom from "../models/riaziYazdahom.js";



export const create = async (req, res) => {
    const riaziGet = req.body;
    let studentId = riaziGet.studentId
    try {      
        const user = await riaziYazdahom.find({studentId})
        if(user.length == 0){
            const newTopic = new riaziYazdahom({ ...riaziGet })
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
        const topicGet = await riaziYazdahom.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    
    await riaziYazdahom.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await riaziYazdahom.findByIdAndRemove(id)
    
}
 

 export const getBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const topics = await riaziYazdahom.find({ Title })
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
        const topics = await riaziYazdahom.find({ studentId })
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
        const topics = await riaziYazdahom.find({ studentId })
        if(topics.length>0){//exists

            await riaziYazdahom.updateOne({studentId:studentId},{$set:{
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