import mongoose from "mongoose"
import riaziFaregh from "../models/riaziFaregh.js";
import sampleTopicPrivate from "../models/sampleTopicPrivate.js";

export const create = async (req, res) => {
    const riaziGet = req.body;
    let studentId = riaziGet.studentId
    try {      
        const user = await riaziFaregh.find({studentId})
        if(user.length == 0){
            const newTopic = new riaziFaregh({ ...riaziGet })
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
        const topicGet = await riaziFaregh.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    await riaziFaregh.deleteMany({})
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await riaziFaregh.findByIdAndRemove(id)
    
}
 

 export const getBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const topics = await riaziFaregh.find({ Title })
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
        const topics = await riaziFaregh.find({ studentId })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const updateById = async (req, res) => {
    const obj  = req.body
    let studentId = obj.studentId
    let topicsDetails = obj.topicsDetails
    let topicsAzmoon = obj.topicsAzmoon
    try {
        const topics = await riaziFaregh.find({ studentId })
        if(topics.length>0){//exists

            await riaziFaregh.updateOne({studentId:studentId},{$set:{
                topicsDetails:topicsDetails,
                topicsAzmoon:topicsAzmoon
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
    const { searchQuery,doneTopics } = req.query
    let code = '03'
    try {
        const studentId = searchQuery
        // const topics = await riaziFaregh.find({ studentId })//studentId , topicsDetails
        const topics = doneTopics
        const privateArr = await sampleTopicPrivate.find({code})//code , sampleTopicP
        //_______________________________________________________
        let bigArrayR = []
        let bigArrayS = []
        let mixed = []
        let statusPlaceOne = []
        let statusPlaceTwo = []
        let workPlaceOne = []
        let workPlaceTwo = []
    
        let statusPlaceOneDesc = []
        let workPlaceOneDesc = []
        let arr = ['مطالعه اول','مرور اول','مرور دوم','مرور سوم','تثبیت','جمعبندی','اتمام','حذف شده']
        let workarr = ['نخوانده','خوانده','نیمه خوانده']
    
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
                if(statusPlaceTwo[mixed[i].topicRoutes[2]] == null){
                    statusPlaceTwo[mixed[i].topicRoutes[2]] = statusArray
                    statusPlaceTwo[mixed[i].topicRoutes[2]][9]=mixed[i].topicRoutes[1]
                }
                mixed[i].studyStatusNext == 10? mixed[i].studyStatusNext=7:''
                statusPlaceTwo[mixed[i].topicRoutes[2]][mixed[i].studyStatusNext] += 1
                statusPlaceTwo[mixed[i].topicRoutes[2]][8] += 1
            }
        }

        for(let i =0;i<statusPlaceOne.length;i++){
            statusPlaceOneDesc.push(statusPlaceOne[i])
        }

        for(let i =0;i<statusPlaceOneDesc.length;i++){
            if(statusPlaceOneDesc[i]!=null){
                for(let j =0;j<statusPlaceOneDesc[i].length;j++){
                    if(statusPlaceOneDesc[i][8]==0)statusPlaceOneDesc[i][8]=1
                    statusPlaceOneDesc[i][j] = (statusPlaceOneDesc[i][j]*100/statusPlaceOneDesc[i][8])
                }
            }else{
                statusPlaceOneDesc[i]=[0,0,0,0,0,0,0,0,0,i]
            }
        }

        
        for(let i =0;i<statusPlaceOneDesc.length;i++){
            let str = ''
            for(let j =0;j<7;j++){
                if(statusPlaceOneDesc[i][j]!=0){
                    str+='%'+arr[j]+statusPlaceOneDesc[i][j].toFixed(1)
                }
            }
            statusPlaceOneDesc[i] = str===''?'مطالعه اول%100':str
        }

        for(let i =0;i<statusPlaceOne.length;i++){
            if(statusPlaceOne[i]!=null){
                for(let j =0;j<statusPlaceOne[i].length;j++){
                    if(statusPlaceOne[i][8]==0)statusPlaceOne[i][8]=1
                    statusPlaceOne[i][j] = (statusPlaceOne[i][j]*360/statusPlaceOne[i][8])
                }
            }else{
                statusPlaceOne[i]=[0,0,0,0,0,0,0,0,0,i]
            }
        }
        

        for(let i =0;i<statusPlaceTwo.length;i++){
            if(statusPlaceTwo[i]!=null){
                for(let j =0;j<statusPlaceTwo[i].length;j++){
                    if(statusPlaceTwo[i][8]==0)statusPlaceTwo[i][8]=1
                    statusPlaceTwo[i][j] = (statusPlaceTwo[i][j]*360/statusPlaceTwo[i][8])
                }
            }else{
                statusPlaceTwo[i]=[0,0,0,0,0,0,0,0,0,i]
            }
        }

            for(let i =0;i<statusPlaceOne.length;i++){
                for(let j =1;j<statusPlaceOne[i].length;j++){
                    statusPlaceOne[i][j]+=statusPlaceOne[i][j-1]
                }
            }

            for(let i =0;i<statusPlaceTwo.length;i++){
                for(let j =1;j<statusPlaceTwo[i].length;j++){
                    statusPlaceTwo[i][j]+=statusPlaceTwo[i][j-1]
                }
            }

            for(let i =0;i<statusPlaceOne.length;i++){
                for(let j =0;j<statusPlaceOne[i].length;j++){
                    statusPlaceOne[i][j] = parseInt(statusPlaceOne[i][j].toFixed(1))
                }
            }

            for(let i =0;i<statusPlaceTwo.length;i++){
                for(let j =0;j<statusPlaceTwo[i].length;j++){
                    statusPlaceTwo[i][j] = parseInt(statusPlaceTwo[i][j].toFixed(1))
                }
            }

        //____________________________WORK PLACE___________________
        
    for(let i =0;i<mixed.length;i++){
        let statusArray = [0,0,0,0,0]
        if(mixed[i].topicRoutes.length>1){
            if(workPlaceOne[mixed[i].topicRoutes[1]] == null){
                workPlaceOne[mixed[i].topicRoutes[1]] = statusArray
            }
            workPlaceOne[mixed[i].topicRoutes[1]][mixed[i].workStatus] += 1
            workPlaceOne[mixed[i].topicRoutes[1]][4] += 1
        }
    }

    for(let i =0;i<mixed.length;i++){
        let statusArray = [0,0,0,0,0]
        if(mixed[i].topicRoutes.length>1){
            if(workPlaceTwo[mixed[i].topicRoutes[2]] == null){
                workPlaceTwo[mixed[i].topicRoutes[2]] = statusArray
            }
            workPlaceTwo[mixed[i].topicRoutes[2]][mixed[i].workStatus] += 1
            workPlaceTwo[mixed[i].topicRoutes[2]][4] += 1
        }
    }
  

    for(let i =0;i<workPlaceOne.length;i++){
        workPlaceOneDesc.push(workPlaceOne[i])
    }

    for(let i =0;i<workPlaceOneDesc.length;i++){
        if(workPlaceOneDesc[i]!=null){
            for(let j =0;j<workPlaceOneDesc[i].length;j++){
                if(workPlaceOneDesc[i][4]==0)workPlaceOneDesc[i][4]=1
                workPlaceOneDesc[i][j] = (workPlaceOneDesc[i][j]*100/workPlaceOneDesc[i][4])
            }
        }else{
            workPlaceOneDesc[i]=[0,0,0,0,0]
        }
    }
    
   for(let i =0;i<workPlaceOneDesc.length;i++){
            let str = ''
            for(let j =0;j<3;j++){
                if(workPlaceOneDesc[i][j]!=0){
                    str+='%'+workarr[j]+workPlaceOneDesc[i][j].toFixed(1)
                }
            }
            workPlaceOneDesc[i] = str===''?' نخوانده%100':str
        }

    for(let i =0;i<workPlaceOne.length;i++){
        if(workPlaceOne[i]!=null){
            for(let j =0;j<workPlaceOne[i].length;j++){
                if(workPlaceOne[i][4]==0)workPlaceOne[i][4]=1
                workPlaceOne[i][j] = (workPlaceOne[i][j]*360/workPlaceOne[i][4])
            }
        }else{
            workPlaceOne[i]=[0,0,0,0,0]
        }
    }
    
    for(let i =0;i<workPlaceTwo.length;i++){
        if(workPlaceTwo[i]!=null){
            for(let j =0;j<workPlaceTwo[i].length;j++){
                if(workPlaceTwo[i][4]==0)workPlaceTwo[i][4]=1
                workPlaceTwo[i][j] = (workPlaceTwo[i][j]*360/workPlaceTwo[i][4])
            }
        }else{
            workPlaceTwo[i]=[0,0,0,0,0]
        }
    }

  
    for(let i =0;i<workPlaceTwo.length;i++){
        for(let j =1;j<workPlaceTwo[i].length;j++){
            workPlaceTwo[i][j]+=workPlaceTwo[i][j-1]
        }
    }

    for(let i =0;i<workPlaceOne.length;i++){
        for(let j =1;j<workPlaceOne[i].length;j++){
            workPlaceOne[i][j]+=workPlaceOne[i][j-1]
        }
    }

    for(let i =0;i<workPlaceTwo.length;i++){
        for(let j =0;j<workPlaceTwo[i].length;j++){
            workPlaceTwo[i][j] = parseInt(workPlaceTwo[i][j].toFixed(1))
        }
    }

    for(let i =0;i<workPlaceOne.length;i++){
        for(let j =0;j<workPlaceOne[i].length;j++){
            workPlaceOne[i][j] = parseInt(workPlaceOne[i][j].toFixed(1))
        }
    }
  
        //_________________________________________________________

        res.status(200).json({one:statusPlaceOne, two:statusPlaceTwo, oneDesc:statusPlaceOneDesc, workOne:workPlaceOne, workTwo:workPlaceTwo, workOneDesc:workPlaceOneDesc})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}