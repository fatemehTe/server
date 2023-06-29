import mongoose from "mongoose"
import StudentHisBarnameHaftegi from "../models/studentHisBarnameHaftegi.js";



export const createBarname = async (req, res) => {
    const BarnameGet = req.body;
    const newBarname = new StudentHisBarnameHaftegi({ ...BarnameGet })
    try {
        await newBarname.save();
        res.status(200).json(newBarname)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getBarname = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const BarnameGet = await StudentHisBarnameHaftegi.find()
        res.status(200).json(BarnameGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getBarnameByStudentId = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const BarnameGet = await StudentHisBarnameHaftegi.find()
        res.status(200).json(BarnameGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllBarname = async (req, res) => {
    
    await StudentHisBarnameHaftegi.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await StudentHisBarnameHaftegi.findByIdAndRemove(id)
    
}
 

 export const getBarnameBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const Barnames = await StudentHisBarnameHaftegi.find({ Title })
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
        const Barnames = await StudentHisBarnameHaftegi.find({ Id })
        res.json({ data: Barnames })
        res.status(200).json(Barnames)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}