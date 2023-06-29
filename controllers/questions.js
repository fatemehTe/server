import mongoose from "mongoose"
import question from "../models/question.js"


export const createQuestion = async (req, res) => {
    const questionGet = req.body;
    const newQuestion = new question({ ...questionGet })
    try {
        await newQuestion.save();
        res.status(201).json(newQuestion)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getQuestion = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Question = await question.find()
        res.status(200).json(Question)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllQuestion = async (req, res) => {
    await question.deleteMany({})
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await question.findByIdAndRemove(id)
}
export const getQuestionBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const LessonId = searchQuery
        const questions = await question.find({ LessonId })
        res.json({ data: questions })
        res.status(200).json(questions)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}