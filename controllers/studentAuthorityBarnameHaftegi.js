import mongoose from "mongoose"
import StudentAuthorityBarnameHaftegi from "../models/studentAuthorityBarnameHaftegi.js";



export const createBarname = async (req, res) => {
    const BarnameGet = req.body;
    const newBarname = new StudentAuthorityBarnameHaftegi({ ...BarnameGet })
    try {
        await newBarname.save();
        res.status(201).json(newBarname)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getBarname = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const BarnameGet = await StudentAuthorityBarnameHaftegi.find()
        res.status(200).json(BarnameGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllBarname = async (req, res) => {
    await StudentAuthorityBarnameHaftegi.deleteMany({})
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await StudentAuthorityBarnameHaftegi.findByIdAndRemove(id)
    
}
 

 export const getBarnameBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ Title })
        res.json({ data: Barnames })
        res.status(200).json(Barnames)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getBarnameBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Id = searchQuery
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ Id })
        res.json({ data: Barnames })
        res.status(200).json(Barnames)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getBarnameByStudentIdAndThisWeek = async (req, res) => {
    const { studentId, weekStartDate } = req.query
    try {
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ $and: [{ studentId }, { weekStartDate }] })
        res.json({ data: Barnames })
        res.status(200).json(Barnames)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getBarnameByStudentId = async (req, res) => {
    const { studentId } = req.query
    try {
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ studentId })
        res.status(200).json(Barnames)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
