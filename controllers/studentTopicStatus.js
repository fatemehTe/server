import mongoose from "mongoose"
import StudentTopicStatus from "../models/studentTopicStatus.js";



export const createStudentTopic = async (req, res) => {
    const studentTopicGet = req.body;
    const newStudentTopic = new StudentTopicStatus({ ...studentTopicGet })
    try {
        await newStudentTopic.save();
        res.status(201).json(newStudentTopic)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getStudentTopic = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const studentTopicGet = await StudentTopicStatus.find()
        res.status(200).json(studentTopicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllStudentTopic = async (req, res) => {
    
    await StudentTopicStatus.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await StudentTopicStatus.findByIdAndRemove(id)
    
}
 

 export const getStudentTopicBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const studentTopics = await StudentTopicStatus.find({ Title })
        res.json({ data: studentTopics })
        res.status(200).json(studentTopics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getStudentTopicBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Id = searchQuery
        const studentTopics = await StudentTopicStatus.find({ Id })
        res.json({ data: studentTopics })
        res.status(200).json(studentTopics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}