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
export const UpdateBarnameBySTIdMoshIdStartDate = async (req, res) => {
    const obj = req.body
    let studentId = obj.studentId
    let moshaverId = obj.moshaverId
    let weekStartDate = obj.weekStartDate
    let mainObject = obj.mainObject
    // return res.status(200).json({m:obj})
    try {
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ $and: [{ studentId }, { weekStartDate }, {moshaverId}]  })
        // return res.status(200).json({m:Barnames})
        if(Barnames.length>0){
            let week= Barnames[0].barnames
            for(let i=0;i<week.length;i++){
                if(week[i].tarikh === mainObject.tarikh){
                    if(week[i].done == false){
                        week[i].tasks = mainObject.tasks
                        week[i].done = mainObject.done
                    }else{
                        return res.status(200).json({message:'برنامه این روز را قبلا ثبت کرده اید'})
                    }
                }
            }
            let updated = await StudentAuthorityBarnameHaftegi.updateOne({studentId:studentId, moshaverId:moshaverId, weekStartDate:weekStartDate},{$set:{
                barnames:Barnames[0].barnames
            }})
           return res.status(200).json({message:updated})
        }
        else{
            return res.status(200).json({message:'not exist'})
        }
    } catch (error) {
        return  res.status(404).json({ message: error })
    }
}

export const UpdateBarnameBySTIdMoshIdStartDateForFinish = async (req, res) => {
    const obj = req.body
    let studentId = obj.studentId
    let moshaverId = obj.moshaverId
    let weekStartDate = obj.weekStartDate
    // return res.status(200).json({mggg:obj})
    try {
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ $and: [{ studentId }, { weekStartDate }, {moshaverId}]  })
        // return res.status(200).json({m:Barnames})
        if(Barnames.length>0){
            let updated = await StudentAuthorityBarnameHaftegi.updateOne({studentId:studentId, moshaverId:moshaverId, weekStartDate:weekStartDate},{$set:{
                done:true
            }})
           return res.status(200).json({message:updated})
        }
        else{
            return res.status(200).json({message:'not exjkhkjhjist'})
        }
    } catch (error) {
        return  res.status(404).json({ message: error })
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
    const  {studentId,moshaverId}  = req.query
    let done = false
    try {
        const Barnames = await StudentAuthorityBarnameHaftegi.find({ $and: [{ studentId }, { moshaverId }, {done}] })
        res.status(200).json(Barnames)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getBarnameBySTIdMoshIdStartDate = async (req, res) => {
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
