import mongoose from "mongoose"
import province from "../models/province.js"


export const createProvince = async (req, res) => {
    const provinceGet = req.body;
    const newProvince = new province({ ...provinceGet })
    try {
        await newProvince.save();
        res.status(201).json(newProvince)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getProvinces = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Province = await province.find()
        console.log(Province, 'get provinces')
        res.status(200).json(Province)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const deleteAll = async (req, res) => {
    await province.remove()
    res.json('all provinces deleted successfully')
}