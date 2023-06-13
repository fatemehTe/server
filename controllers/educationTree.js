import mongoose from "mongoose"
import educationTree from "../models/educationTree.js"


export const createEducationTree = async (req, res) => {
    const educationTreeGet = req.body;
    const neweducationTree = new educationTree({ ...educationTreeGet })
    try {
        await neweducationTree.save();
        res.status(201).json(neweducationTree)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getEducationTree = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const educationTreeGet = await educationTree.find()
        res.status(200).json(educationTreeGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllEducationTree = async (req, res) => {
    
    await educationTree.remove()
    res.json('all cities deleted successfully')
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await educationTree.findByIdAndRemove(id)
    res.json(' city deleted successfully')
}
