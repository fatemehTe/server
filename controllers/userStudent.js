import UserStudent from '../models/userStudent.js';


export const userStudent = async (req, res) => {
    const user = req.body
    let userId = user.userId
    let userExpand = {
        ...user,
        moshaverIds:[]
    }
    try {
        const existingUser = await UserStudent.findOne({ userId })
        const result = ''
        if (existingUser) {
            result = await UserStudent.updateOne({userId:userId},{$set:{
                name:user.name,
                familyName:user.familyName,  
                maghtaId:user.maghtaId,
                feildId:user.feildId,
                email:user.email,
                profilePicture:user.profilePicture,
                cityId:user.cityId,
                provinceId:user.provinceId,
                moshaverIds:user.moshaverIds,
                schoolName:user.schoolName
            }})
            return res.status(201).json({ result })//edit
        }else{
            result = await UserStudent.create({ ...userExpand })
            return res.status(200).json({ result })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getUsers = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Users = await UserStudent.find()
        console.log(Users)
        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getUserStudentById = async (req, res) => {
    const { searchQuery } = req.query
    try {
        const userId = searchQuery
        const userFound = await UserStudent.find({ userId })
        res.status(200).json(userFound)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getUserStudentByIds = async (req, res) => {
    const { searchQuery } = req.query
    try {
        const userIds = searchQuery
        const array = userIds.split(',')
        let students = await UserStudent.find({userId: {$in: array}});
        return res.status(200).json(students)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const deleteUsers = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Users = await UserStudent.deleteMany({})
        console.log(Users)
        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getReshteIdByStudentId = async (req, res) => {
    const { userId } = req.query

    try {
        const existingUser = await UserStudent.findOne({ userId })
        if (existingUser) {
            const result = {
                maghtaId:existingUser.maghtaId,
                feildId:existingUser.feildId
            }
            return res.status(201).json({ result })//edit
        }else{
            res.status(404).json({ message: 'no user found' })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

