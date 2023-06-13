import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Karbar from '../models/karbar.js';

export const signin = async (req, res) => {
    const { mobile, password } = req.body //username is mobile
    try {
        
        const existingUser = await Karbar.findOne({ mobile })
        if (!existingUser) return res.status(404).json({ message: "user doesn't exist." })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials." })
        const token = jwt.sign({ mobile: existingUser.mobile, id: existingUser._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
    }
}


export const signup = async (req, res) => {
    const { mobile, password, userType } = req.body
    try {
        const existingUser = await Karbar.findOne({ mobile })
        if (existingUser) return res.status(400).json({ message: "user already exists." })
        // if (password !== confirmedPassword) return res.status(400).json({ message: "passwords don't match." })
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await Karbar.create({ mobile, password: hashedPassword, userType })
        const token = jwt.sign({ mobile: result.mobile, id: result._id }, 'test', { expiresIn: '1h' }) 
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
    }
}

export const getUsers = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Users = await Karbar.find()
        console.log(Users)
        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const getUsersById = async (req, res) => {
    const { searchQuery } = req.query
    // return res.status(200).json({msg:searchQuery})
    try {
        const _id = searchQuery
        const Users = await Karbar.find({ _id })
        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
