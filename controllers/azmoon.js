import mongoose from "mongoose"
import Azmoon from "../models/azmoon.js";



export const createAzmoon = async (req, res) => {
    const azmoonGet = req.body;
    const newAzmoon = new Azmoon({ ...azmoonGet })
    try {
        await newAzmoon.save();
        res.status(201).json(newAzmoon)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getAzmoon = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const azmoonGet = await Azmoon.find()
        res.status(200).json(azmoonGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllAzmoon = async (req, res) => {
    
    await Azmoon.remove()
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await Azmoon.findByIdAndRemove(id)
    
}
 

 export const getAzmoonBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const azmoons = await Azmoon.find({ Title })
        res.json({ data: azmoons })
        res.status(200).json(azmoons)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getAzmoonBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Id = searchQuery
        const azmoons = await Azmoon.find({ Id })
        res.json({ data: azmoons })
        res.status(200).json(azmoons)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}