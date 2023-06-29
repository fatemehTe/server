import mongoose from "mongoose"
import city from "../models/city.js"


export const createCity = async (req, res) => {
    const cityGet = req.body;
    const newcity = new city({ ...cityGet })
    try {
        await newcity.save();
        res.status(201).json(newcity)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getCities = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const City = await city.find()
        console.log(City, 'get Citys')
        res.status(200).json(City)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getCitiesByProvinceId = async (req, res) => {
    const { searchQuery } = req.query
    try {
        const provinceId = searchQuery
        const City = await city.find({ provinceId })
        res.status(200).json(City)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllCity = async (req, res) => {
    
    await city.deleteMany({})
    res.json('all cities deleted successfully')
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await city.findByIdAndRemove(id)
    res.json(' city deleted successfully')
}
