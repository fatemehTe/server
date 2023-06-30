import mongoose from "mongoose"
import ensaniDavazdahom from "../models/ensaniDavazdahom.js";
import sampleTopicPrivate from "../models/sampleTopicPrivate.js";



export const create = async (req, res) => {
    const ensaniGet = req.body;
    let studentId = ensaniGet.studentId
    try {      
        const user = await ensaniDavazdahom.find({studentId})
        if(user.length == 0){
            const newTopic = new ensaniDavazdahom({ ...ensaniGet })
            await newTopic.save();
            res.status(201).json(newTopic)
        }else{
            res.status(201).json({ message: 'exists' })
        }
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const get = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await ensaniDavazdahom.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    
    await ensaniDavazdahom.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await ensaniDavazdahom.findByIdAndRemove(id)
    
}
 

 export const getBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const studentId = searchQuery
        const topics = await ensaniDavazdahom.find({ studentId })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const studentId = searchQuery
        const topics = await ensaniDavazdahom.find({ studentId })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const updateById = async (req, res) => {
    const  obj  = req.body
    let studentId = obj.studentId
    let topicsDetails = obj.topicsDetails
    try {
        const topics = await ensaniDavazdahom.find({ studentId })
        if(topics.length>0){//exists

            await ensaniDavazdahom.updateOne({studentId:studentId},{$set:{
                topicsDetails:topicsDetails
            }})

        }else{
            res.status(200).json({message:'not this user found'})    
        }
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getSudystatusRouted = async (req, res) => {
    const { searchQuery } = req.query
    let code = '22'
    try {
        const studentId = searchQuery
        const topics = await ensaniDavazdahom.find({ studentId })//studentId , topicsDetails
        const privateArr = await sampleTopicPrivate.find({code})//code , sampleTopicP
        //_______________________________________________________
        let bigArrayR = []
        let bigArrayS = []
        let mixed = []
        let statusPlaceOne = []
        let statusPlaceTwo = []
    
        let privateArray = privateArr[0].sampleTopicP
        let topicsArray = topics[0].topicsDetails

        for(let i =0;i<privateArray.length;i++){
            bigArrayR[privateArray[i].Id]=privateArray[i]
        }

        for(let i =0;i<topicsArray.length;i++){
            bigArrayS[topicsArray[i].topicId]=topicsArray[i]
        }


        for(let i =0;i<bigArrayR.length;i++){
            if(bigArrayR[i] != null && bigArrayS[i] != null){
                if(bigArrayR[i].Id == bigArrayS[i].topicId){
                  let obj = {
                    ...bigArrayS[i],
                    topicRoutes:bigArrayR[i].topicRoutes
                  }
                  mixed.push(obj)
                }
              }
        }

        for(let i =0;i<mixed.length;i++){
            let statusArray = [0,0,0,0,0,0,0,0,0,0]
            if(mixed[i].topicRoutes.length>1){
                if(statusPlaceOne[mixed[i].topicRoutes[1]] == null){
                statusPlaceOne[mixed[i].topicRoutes[1]] = statusArray
                statusPlaceOne[mixed[i].topicRoutes[1]][9]=mixed[i].topicRoutes[1]
                }
                mixed[i].studyStatusNext == 10? mixed[i].studyStatusNext=7:''
                statusPlaceOne[mixed[i].topicRoutes[1]][mixed[i].studyStatusNext] += 1
                statusPlaceOne[mixed[i].topicRoutes[1]][8] += 1
            }
        }

        for(let i =0;i<mixed.length;i++){
            let statusArray = [0,0,0,0,0,0,0,0,0,0]
            if(mixed[i].topicRoutes.length>1){
                if(statusPlaceTwo[mixed[i].topicRoutes[1]] == null){
                    statusPlaceTwo[mixed[i].topicRoutes[1]] = statusArray
                    statusPlaceTwo[mixed[i].topicRoutes[1]][9]=mixed[i].topicRoutes[1]
                }
                mixed[i].studyStatusNext == 10? mixed[i].studyStatusNext=7:''
                statusPlaceTwo[mixed[i].topicRoutes[1]][mixed[i].studyStatusNext] += 1
                statusPlaceTwo[mixed[i].topicRoutes[1]][8] += 1
            }
        }

        for(let i =0;i<statusPlaceOne.length;i++){
            if(statusPlaceOne[i]!=null){
                for(let j =0;j<statusPlaceOne[i].length;j++){
                    if(statusPlaceOne[i][8]==0)statusPlaceOne[i][8]=1
                    statusPlaceOne[i][j] = statusPlaceOne[i][j]*100/statusPlaceOne[i][8]
                }
            }else{
                statusPlaceOne[i]=[0,0,0,0,0,0,0,0,0,i]
            }
        }

        for(let i =0;i<statusPlaceTwo.length;i++){
            if(statusPlaceTwo[i]!=null){
                for(let j =0;j<statusPlaceTwo[i].length;j++){
                    if(statusPlaceTwo[i][8]==0)statusPlaceTwo[i][8]=1
                    statusPlaceTwo[i][j] = statusPlaceTwo[i][j]*100/statusPlaceTwo[i][8]
                }
            }else{
                statusPlaceTwo[i]=[0,0,0,0,0,0,0,0,0,i]
            }
        }

        res.status(200).json({one:statusPlaceOne, two:statusPlaceTwo})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}