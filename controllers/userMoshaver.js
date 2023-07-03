import UserMoshaver from '../models/userMoshaver.js';
import UserStudent from '../models/userStudent.js';


export const userMoshaver = async (req, res) => {
    const user = req.body
    let userId = user.userId
    let userExpand = {
        ...user,
        studentIds:[],
        wholePosCount:0,
        emptyPosCount:0,
        successDoneCount:0,
        stars:0
    }
    try {
        const existingUser = await UserMoshaver.findOne({ userId })
        const result = ''
        if (existingUser) {
            result = await UserMoshaver.updateOne({userId:userId},{$set:{
                name:user.name,
                familyName:user.familyName,  
                maghtaId:user.maghtaId,
                email:user.email,
                profilePicture:user.profilePicture,
                cityId:user.cityId,
                provinceId:user.provinceId,
                universityName:user.universityName,
                universityFeild:user.universityFeild,
                isStuding:user.isStuding,
                studentIds:user.studentIds,
                description:user.description,
                sabeghe:user.sabeghe,
                wholePosCount:user.wholePosCount,
                emptyPosCount:user.emptyPosCount,
                bestDone:user.bestDone,
                successDoneCount:user.successDoneCount,
                stars:user.stars
            }})
            return res.status(201).json({ result })//edit
        }else{
            result = await UserMoshaver.create({ ...userExpand })
            return res.status(200).json({ result })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const setStudentForMoshaver = async (req, res) => {
    const user = req.body
    let userId = user.userId
    let studentId = user.studentId
    try {
        const existingUser = await UserMoshaver.findOne({ userId })
        const index = existingUser.studentIds.findIndex((id)=>id===String(studentId));
        const filter = {userId:userId}
        if (index === -1) {
            existingUser.studentIds.push(studentId)
            const updatedPost = await UserMoshaver.findOneAndUpdate(filter, existingUser)
            res.status(200).json({ updatedPost })
        } else {
             res.status(200).json({ msg:'student exists in moshaver students' })
        }
       
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

export const getUsers = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Users = await UserMoshaver.find()
        console.log(Users)
        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const deleteUsers = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const Users = await UserMoshaver.deleteMany({})
        console.log(Users)
        res.status(200).json(Users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getUserMoshaverById = async (req, res) => {
    const { searchQuery } = req.query
    try {
        const userId = searchQuery
        const userFound = await UserMoshaver.find({ userId })
        res.status(200).json(userFound)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getUserMoshaverByStId = async (req, res) => {
    const { studentId } = req.query
    // return  res.status(404).json({ message: studentId })
    try {
        const userFound = await UserMoshaver.find({ studentId })
        if(userFound.length>0){
            res.status(200).json(userFound)
        }else{
            res.status(200).json({message:'not exsists'})
        }
        
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


