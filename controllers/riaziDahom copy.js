import mongoose from "mongoose"
import riaziDahom from "../models/riaziDahom.js";
import sampleTopicPrivate from "../models/sampleTopicPrivate.js";
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

export const getSudystatusRouted = async (req, res) => {
    const { searchQuery ,doneTopics, moshaverId } = req.query
    return res.status(200).jspn(req.query)
    let code = '00'
    const studentId = searchQuery
    const weekStartDate = doneTopics
    try {
        const weekTasks = await studentAuthorityBarnameHaftegi.find({ $and: [{ studentId }, { weekStartDate }, {moshaverId}] })
        //try findOne also
        const topics = await riaziDahom.find({ studentId })//studentId , topicsDetails
        const privateArr = await sampleTopicPrivate.find({code})//code , sampleTopicP
        //_______________________________________________________

        let allDays = weekTasks[0].barnames
        
        let allPickedTopics = []//id, workStatus, darsadAzmoon

        allDays.map((x)=>{
            x.tasks.map((y)=>{
                allPickedTopics.push(y.pickedTopics)
            })
        })
        
        
        let bigArrayR = []
        let bigArrayT = []
        let bigArrayA = []
        let bigArrayW = []
        let mixedT = []
        let mixedA = []
        let mixedW = []

        let statusPlaceOne = []
        let statusPlaceTwo = []
        let workPlaceOne = []
        let workPlaceTwo = []
    
        let statusPlaceOneDesc = []
        let workPlaceOneDesc = []

        let azmoonPlaceOneDesc = []
        let azmoonPlaceTwoDesc = []
        

        let arr = ['مطالعه اول','مرور اول','مرور دوم','- مرور سوم','تثبیت','جمعبندی','اتمام','حذف شده']
        let workarr = ['نخوانده','خوانده','نیمه خوانده']
    
        let privateArray = privateArr[0].sampleTopicP//Id, topicRoutes
        let AzmoonArray = topics[0].topicsAzmoon//topics two digits decimal each topic darsad NO NEED HERE
        let topicsArray = topics[0].topicsDetails//topics.0 .1 .2 .3 .4 .5 .6 .7
        allPickedTopics = allPickedTopics.flat()//workSttaus, id
        
        

        for(let i =0;i<topicsArray.length;i++){
            bigArrayT[Math.floor(topicsArray[i])]=parseInt((topicsArray[i]%1).toFixed(1)*10)
        }
        

        for(let i =0;i<AzmoonArray.length;i++){
            bigArrayA[Math.floor(topicsArray[i])]=parseInt((topicsArray[i]%1).toFixed(2)*100)
        }
        
        for(let i =0;i<privateArray.length;i++){
            bigArrayR[privateArray[i].Id]=privateArray[i]
        }
        
        for(let i =0;i<allPickedTopics.length;i++){
            bigArrayW[allPickedTopics[i].id]=allPickedTopics[i].workStatus
        }

        for(let i =0;i<bigArrayW.length;i++){
            if(bigArrayR[i] != null && bigArrayW[i] != null){
                  let obj = {
                    id:i,
                    workStatus:bigArrayW[i],
                    topicRoutes:bigArrayR[i].topicRoutes
                  }
                  mixedW.push(obj)
                }
        }
        
        for(let i =0;i<bigArrayT.length;i++){
            if(bigArrayR[i] != null && bigArrayT[i] != null){
                  let obj = {
                    id:i,
                    studyStatusNext:bigArrayT[i],
                    topicRoutes:bigArrayR[i].topicRoutes
                  }
                  mixedT.push(obj)
                }
        }
        
        for(let i =0;i<bigArrayA.length;i++){
            if(bigArrayR[i] != null && bigArrayA[i] != null){
                  let obj = {
                    id:i,
                    azmoonDarsad:bigArrayA[i],
                    topicRoutes:bigArrayR[i].topicRoutes
                  }
                  mixedA.push(obj)
                }
        }
           
        for(let i =0;i<mixedA.length;i++){
            if(mixedA[i].topicRoutes.length>1){
                if(bigArrayA[mixedA[i].topicRoutes[1]] != null && typeof(bigArrayA[mixedA[i].topicRoutes[1]])!=="string"){
                    bigArrayA[mixedA[i].topicRoutes[1]] = ' - '+ bigArrayA[mixedA[i].topicRoutes[1]]+'% صحیح در آخرین آزمون'
                }
            }
        }

        for(let i =0;i<mixedA.length;i++){
            if(mixedA[i].topicRoutes.length>1){
                if(bigArrayA[mixedA[i].topicRoutes[1]] == null){
                    let a = [0]
                    bigArrayA[mixedA[i].topicRoutes[1]] = a
                    bigArrayA[mixedA[i].topicRoutes[1]].push(mixedA[i].azmoonDarsad)
                }else if(typeof(bigArrayA[mixedA[i].topicRoutes[1]])!=="string"){
                    bigArrayA[mixedA[i].topicRoutes[1]].push(mixedA[i].azmoonDarsad)
                }
            }
        }
        
        
        for(let i =0;i<bigArrayA.length;i++){
                if(typeof(bigArrayA[i])==="string" || bigArrayA[i] == null){
                }else if(typeof(bigArrayA[i]) === "object"){
                    let b = bigArrayA[i]
                    let sum = 0
                    if(b.length>0){
                        for(let j =0;j<b.length;j++){
                            sum+=b[j]
                        }
                        sum = sum/(b.length)
                        bigArrayA[mixedA[i].topicRoutes[1]] = ' -'+ sum+'% صحیح در آخرین آزمون'
                    }
                }
        }
        
        
        for(let i =0;i<mixedT.length;i++){
            if(mixedT[i].topicRoutes.length>1){
                if(bigArrayT[mixedT[i].topicRoutes[1]] != null && typeof(bigArrayT[mixedT[i].topicRoutes[1]])!=="string"){
        

                    bigArrayT[mixedT[i].topicRoutes[1]] = ' - '+ bigArrayT[mixedT[i].topicRoutes[1]]+'% 100'
                }
            }
        }
        
        for(let i =0;i<mixedT.length;i++){
            let statusArray = [0,0,0,0,0,0,0,0,0,0]
            if(mixedT[i].topicRoutes.length>1){
                if(bigArrayT[mixedT[i].topicRoutes[1]] == null){
                statusPlaceOne[mixedT[i].topicRoutes[1]] = statusArray
                statusPlaceOne[mixedT[i].topicRoutes[1]][9]=mixedT[i].topicRoutes[1]
                }
                mixedT[i].studyStatusNext == 10? mixedT[i].studyStatusNext=7:''
                statusPlaceOne[mixedT[i].topicRoutes[1]][mixedT[i].studyStatusNext] += 1
                statusPlaceOne[mixedT[i].topicRoutes[1]][8] += 1
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
                    str+=arr[j]+statusPlaceOneDesc[i][j].toFixed(1)+'% '
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
        
    // for(let i =0;i<mixed.length;i++){
    //     let statusArray = [0,0,0,0,0]
    //     if(mixed[i].topicRoutes.length>1){
    //         if(workPlaceOne[mixed[i].topicRoutes[1]] == null){
    //             workPlaceOne[mixed[i].topicRoutes[1]] = statusArray
    //         }
    //         workPlaceOne[mixed[i].topicRoutes[1]][mixed[i].workStatus] += 1
    //         workPlaceOne[mixed[i].topicRoutes[1]][4] += 1
    //     }
    // }

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
    
    // for(let i =0;i<mixed.length;i++){
    //     let statusArray = [0,0,0,0,0]
    //     if(mixed[i].topicRoutes.length>1){
    //         if(workPlaceTwo[mixed[i].topicRoutes[2]] == null){
    //             workPlaceTwo[mixed[i].topicRoutes[2]] = statusArray
    //         }
    //         workPlaceTwo[mixed[i].topicRoutes[2]][mixed[i].workStatus] += 1
    //         workPlaceTwo[mixed[i].topicRoutes[2]][4] += 1
    //     }
    // }
  
    
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
                    str+=workarr[j]+workPlaceOneDesc[i][j].toFixed(1)+' % - '
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

        res.status(200).json({one:statusPlaceOne, two:statusPlaceTwo, oneDesc:statusPlaceOneDesc, workOne:workPlaceOne, workTwo:workPlaceTwo, workOneDesc:workPlaceOneDesc, azmoonOne:bigArrayA, azmoonTwo:azmoonPlaceTwoDesc})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}