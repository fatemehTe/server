import mongoose from "mongoose"
import riaziDahom from "../models/riaziDahom.js";
import sampleTopicPrivate from "../models/sampleTopicGrand.js";
// import sampleTopicPrivate from "../models/sampleTopicPrivate.js";
import  studentAuthorityBarnameHaftegi from '../models/studentAuthorityBarnameHaftegi.js';


export const create = async (req, res) => {
    const riaziGet = req.body;
    let studentId = riaziGet.studentId
    try {      
        const user = await riaziDahom.find({studentId})
        if(user.length == 0){
            const newTopic = new riaziDahom({ ...riaziGet })
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
        const riaziGet = await riaziDahom.find()
        res.status(200).json(riaziGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    
    await riaziDahom.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await riaziDahom.findByIdAndRemove(id)
    
}
 

 export const getBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const studentId = searchQuery
        const topics = await riaziDahom.find({ studentId })
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
        const topics = await riaziDahom.find({ studentId })
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
    // return res.status(200).json({message:studentId})
    try {
        const topics = await riaziDahom.find({ studentId })
        if(topics.length>0){//exists

            await riaziDahom.updateOne({studentId:studentId},{$set:{
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

export const ReportStIdantTopicId = async (req, res) => {
    const { studentId, topicId } = req.query
//    return res.status(200).json(req.query)
    let code = '00'
    try {
        const topics = await riaziDahom.find({ studentId })//studentId , topicsDetails
        const privateArr = await sampleTopicPrivate.find({code})//code , sampleTopicP

        // return res.status(200).json(privateArr)
        //_______________________________________________________
        let statusFound = ''
        let statusFoundAzmoon = ''
        let statusFoundWork = ''


        let bigArrayR = []
        let bigArrayS = []
        let bigArrayA = []
        let bigArrayW = []
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
        let azmoonArray = topics[0].topicsAzmoon

        

        for(let i =0;i<privateArray.length;i++){
            bigArrayR[privateArray[i].Id]=privateArray[i]
        }

        for(let i =0;i<topicsArray.length;i++){
            let index = Math.floor(topicsArray[i])
            let value = parseInt((topicsArray[i]%1).toFixed(1)*10)
            bigArrayS[index] = value
        }

        for(let i =0;i<azmoonArray.length;i++){
            let index = Math.floor(azmoonArray[i])
            let value = parseInt((azmoonArray[i]%1).toFixed(2)*100)
            bigArrayA[index] = value
        }
        // return res.status(200).json(bigArrayA)

        for(let i =0;i<bigArrayR.length;i++){
            if(bigArrayR[i] != null && bigArrayS[i] != null){
                  let obj = {
                    id:bigArrayR[i].Id,
                    studyStatusNext:bigArrayS[i],
                    topicRoutes:bigArrayR[i].topicRoutes
                  }
                  mixed.push(obj)
              }
        }

        if(bigArrayS[topicId]!=null && bigArrayR[topicId]!=null){
            bigArrayS[topicId]==10?bigArrayS[topicId]=7:''
            statusFound = '100%'+arr[bigArrayS[topicId]]
        }else{
            let MyChilds = []
            let bigArrayCh = []
            let indexArray = [0,0,0,0,0,0,0,0]
                for(let i =0;i<mixed.length;i++){

                    mixed[i].topicRoutes.map((x)=>{
                        x == topicId?MyChilds.push(mixed[i].id):''
                    })
                }
                for(let i =0;i<MyChilds.length;i++){
                    bigArrayCh[MyChilds[i]]=MyChilds[i]
                }
                for(let i =0;i<bigArrayCh.length;i++){
                    if(bigArrayCh[i] != null && bigArrayS[i] != null){
                        indexArray[bigArrayS[i]]+=1
                    }
                }
                let mo1 = (indexArray[0]*100/MyChilds.length)!=0?(indexArray[0]*100/MyChilds.length).toFixed(2)+'%'+arr[0]+' - ':''
                let m1 = (indexArray[1]*100/MyChilds.length)!=0?(indexArray[1]*100/MyChilds.length).toFixed(2)+'%'+arr[1]+' - ':''
                let m2 = (indexArray[2]*100/MyChilds.length)!=0?(indexArray[2]*100/MyChilds.length).toFixed(2)+'%'+arr[2]+' - ':''
                let m3 = (indexArray[3]*100/MyChilds.length)!=0?(indexArray[3]*100/MyChilds.length).toFixed(2)+'%'+arr[3]+' - ':''
                let t = (indexArray[4]*100/MyChilds.length)!=0?(indexArray[4]*100/MyChilds.length).toFixed(2)+'%'+arr[4]+' - ':''
                let j = (indexArray[5]*100/MyChilds.length)!=0?(indexArray[5]*100/MyChilds.length).toFixed(2)+'%'+arr[5]+' - ':''
                let e = (indexArray[6]*100/MyChilds.length)!=0?(indexArray[6]*100/MyChilds.length).toFixed(2)+'%'+arr[6+' - ']:''
                let h = (indexArray[7]*100/MyChilds.length)!=0?(indexArray[7]*100/MyChilds.length).toFixed(2)+'%'+arr[7]:''
                let str = mo1+m1+m2+m3+t+j+e+h
                str.substring(str.length-4,str.length-1 === ' - ')?str = str.substring(0,str.length-3):''
                statusFound = str
        }

        if(bigArrayA[topicId]!=null && bigArrayR[topicId]!=null){
            statusFoundAzmoon = (bigArrayA[topicId]).toFixed(2)+'%'
        }else{
            let MyChilds = []
            let bigArrayCh = []
            let miyangin = 0
                for(let i =0;i<mixed.length;i++){
                    mixed[i].topicRoutes.map((x)=>{
                        x == topicId?MyChilds.push(mixed[i].id):''
                    })
                }
                for(let i =0;i<MyChilds.length;i++){
                    bigArrayCh[MyChilds[i]]=MyChilds[i]
                }
                
                for(let i =0;i<bigArrayCh.length;i++){
                    if(bigArrayCh[i] != null && bigArrayA[i]!=null){
                        miyangin+=bigArrayA[i]
                    }
                }
                statusFoundAzmoon = (miyangin/MyChilds.length).toFixed(2)+'%'
            
        }

        
        return res.status(200).json({st:statusFound,az:statusFoundAzmoon})
        
        
        for(let i =0;i<mixed.length;i++){
            let statusArray = [0,0,0,0,0,0,0,0,0,0]
            if(mixed[i].topicRoutes.length>1){
                if(statusPlaceOne[mixed[i].topicRoutes[1]] == null){
                statusPlaceOne[mixed[i].topicRoutes[1]] = statusArray
                statusPlaceOne[mixed[i].topicRoutes[1]][9]=mixed[i].topicRoutes[1]
                }
                mixed[i].studyStatusNext == 10? mixed[i].studyStatusNext=7:''
                mixed[i].studyStatusNext>0?statusPlaceOne[mixed[i].topicRoutes[1]][mixed[i].studyStatusNext] += 1:''
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
                mixed[i].studyStatusNext>0?statusPlaceTwo[mixed[i].topicRoutes[2]][mixed[i].studyStatusNext] += 1:''
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
  
        //_________________________________________________________

        res.status(200).json({one:statusPlaceOne, two:statusPlaceTwo, oneDesc:statusPlaceOneDesc, workOne:workPlaceOne})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getSudystatusRouted = async (req, res) => {
    const { searchQuery, doneTopics } = req.query

    let code = '00'
    try {
        const studentId = searchQuery
        const topics = await riaziDahom.find({ studentId })//studentId , topicsDetails
        // const topics = doneTopics
        // return res.status(200).json(topics)
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
            let index = Math.floor(topicsArray[i])
            let value = parseInt((topicsArray[i]%1).toFixed(1)*10)
            bigArrayS[index] = value
        }

        
        for(let i =0;i<bigArrayR.length;i++){
            if(bigArrayR[i] != null && bigArrayS[i] != null){
                  let obj = {
                    id:bigArrayR[i].Id,
                    studyStatusNext:bigArrayS[i],
                    topicRoutes:bigArrayR[i].topicRoutes
                  }
                  mixed.push(obj)
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
                mixed[i].studyStatusNext>0?statusPlaceOne[mixed[i].topicRoutes[1]][mixed[i].studyStatusNext] += 1:''
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
                mixed[i].studyStatusNext>0?statusPlaceTwo[mixed[i].topicRoutes[2]][mixed[i].studyStatusNext] += 1:''
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
  
        //_________________________________________________________

        res.status(200).json({one:statusPlaceOne, two:statusPlaceTwo, oneDesc:statusPlaceOneDesc, workOne:workPlaceOne})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}