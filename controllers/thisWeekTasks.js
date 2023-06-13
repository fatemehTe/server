import mongoose from "mongoose"
import thisWeekTasks from "../models/thisWeekTasks.js";

export const create = async (req, res) => {
    const topicGet = req.body;
    const newTopic = new thisWeekTasks({ ...topicGet })
    try {
        await newTopic.save();
        res.status(201).json(newTopic)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const pushIntoTasks = async (req, res) => {
    const mainObject = req.body

    let studentId = mainObject.studentId
    let moshaverId = mainObject.moshaverId
    let weekStartDate = mainObject.weekStartDate
    let firstWeekDateDayName = mainObject.firstWeekDateDayName
    let newTasks = mainObject.tasks

    let tasks = []
    try {
        const existingThisWeekTasks = await thisWeekTasks.findOne({ studentId:studentId, moshaverId:moshaverId, weekStartDate:weekStartDate })
        if (existingThisWeekTasks){
            
            tasks = existingThisWeekTasks.tasks
            newTasks.map((x)=>{
                tasks.push(x)
            })
            const updateResult = await thisWeekTasks.updateOne({studentId:studentId, moshaverId:moshaverId, weekStartDate:weekStartDate},{$set:{
                firstWeekDateDayName:firstWeekDateDayName,
                tasks:tasks
            }})
            return res.status(200).json({ updateResult:updateResult })
        } 
        const createResult = await thisWeekTasks.create({ ...mainObject })
        res.status(200).json({ createResult:createResult })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
    }
}

export const getReportByStudentAndMoshaverIdAndStartDate = async (req, res) => {
    const {studentId,moshaverId,weekStartDate} = req.query
    let a = {
        studentId:studentId,
        moshaverId:moshaverId,
        weekStartDate:weekStartDate
    }
    
    try {
        const existingThisWeekTasks = await thisWeekTasks.findOne({ studentId:studentId, moshaverId:moshaverId, weekStartDate:weekStartDate })
        // const existingThisWeekTasks = await thisWeekTasks.find()
        if (existingThisWeekTasks){
            return res.status(200).json({ existingThisWeekTasks:existingThisWeekTasks })
        } 
        res.status(200).json({ message: 'no report' })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
    }
}

export const get = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await thisWeekTasks.find()
        res.status(200).json(topicGet)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    await thisWeekTasks.deleteMany({})
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await thisWeekTasks.findByIdAndRemove(id)  
}
 