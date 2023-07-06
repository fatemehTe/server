import mongoose from "mongoose"
import riaziDavazdahom from "../models/riaziDavazdahom.js";
// import sampleTopicPrivate from "../models/sampleTopicPrivate.js";
import sampleTopicPrivate from "../models/sampleTopicGrand.js";


export const create = async (req, res) => {
    const riaziGet = req.body;
    let studentId = riaziGet.studentId
    try {      
        const user = await riaziDavazdahom.find({studentId})
        if(user.length == 0){
            const newTopic = new riaziDavazdahom({ ...riaziGet })
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
        const topicGet = await riaziDavazdahom.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAll = async (req, res) => {
    
    await riaziDavazdahom.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await riaziDavazdahom.findByIdAndRemove(id)
    
}
 

 export const getBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const topics = await riaziDavazdahom.find({ Title })
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
        const topics = await riaziDavazdahom.find({ studentId })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const updateById = async (req, res) => {
    const  obj  = req.body
    let studentId = obj.studentId
    let topicsDetails = obj.topicsDetails
    let topicsAzmoon = obj.topicsAzmoon
    try {
        const topics = await riaziDavazdahom.find({ studentId })
        if(topics.length>0){//exists

            await riaziDavazdahom.updateOne({studentId:studentId},{$set:{
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
    const { studentId, topicId, weekStartDate, moshaverId } = req.query
//    return res.status(200).json(req.query)
    let code = '02'
    try {
        const topics = await riaziDavazdahom.find({ studentId })//studentId , topicsDetails
        const privateArr = await sampleTopicPrivate.find({code})//code , sampleTopicP
     
        
        // return res.status(200).json(privateArr)
        //_______________________________________________________
        let statusFound = ''
        let statusFoundAzmoon = ''
        let workstatusFound = ''
        let statusFoundArray = [{c:'',d:0},{c:'',d:0},{c:'',d:0},{c:'',d:0},{c:'',d:0},{c:'',d:0},{c:'',d:0},{c:'',d:0}]


        let bigArrayR = []
        let bigArrayS = []
        let bigArrayA = []
        let bigArrayW = []
        let mixed = []
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
        
        if(weekStartDate !== 'null' && moshaverId !== 'null'){
            
                const weekTasks = await studentAuthorityBarnameHaftegi.find({ $and: [{ studentId }, { weekStartDate }, {moshaverId}] })
                
                let allDays = weekTasks[0].barnames
            
                let allPickedTopics = []//id, workStatus, darsadAzmoon
        
                allDays.map((x)=>{
                    x.tasks.map((y)=>{
                        allPickedTopics.push(y.pickedTopics)
                        allPickedTopics = allPickedTopics.flat()//workSttaus, id
                    })
                })
                
            
            
            
            for(let i =0;i<allPickedTopics.length;i++){
                bigArrayW[allPickedTopics[i].id]=allPickedTopics[i].workStatus
            }
            // return res.status(200).json(bigArrayW)
            if(bigArrayW[topicId]!=null && bigArrayR[topicId]!=null){
                workstatusFound = '100%'+workarr[bigArrayW[topicId]]
            }else{
                let MyChilds = []
                let bigArrayCh = []
                let indexArray = [0,0,0]
                    for(let i =0;i<mixed.length;i++){
    
                        mixed[i].topicRoutes.map((x)=>{
                            x == topicId?MyChilds.push(mixed[i].id):''
                        })
                    }
                    for(let i =0;i<MyChilds.length;i++){
                        bigArrayCh[MyChilds[i]]=MyChilds[i]
                    }
                    for(let i =0;i<bigArrayCh.length;i++){
                        if(bigArrayCh[i] != null && bigArrayW[i] != null){
                            indexArray[bigArrayW[i]]+=1
                        }
                    }
                    let n = (indexArray[0]*100/MyChilds.length)!=0?(indexArray[0]*100/MyChilds.length).toFixed(2)+'%'+workarr[0]+' - ':''
                    let kh = (indexArray[1]*100/MyChilds.length)!=0?(indexArray[1]*100/MyChilds.length).toFixed(2)+'%'+workarr[1]+' - ':''
                    let nikh = (indexArray[2]*100/MyChilds.length)!=0?(indexArray[2]*100/MyChilds.length).toFixed(2)+'%'+workarr[2]+' - ':''
                    
                    let str = n+kh+nikh
                    str.substring(str.length-4,str.length-1 === ' - ')?str = str.substring(0,str.length-3):''
                    workstatusFound = str
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
                MyChilds.length == 0?MyChilds.length =1:''
                let mo1 = (indexArray[0]*100/MyChilds.length)!=0?(indexArray[0]*100/MyChilds.length).toFixed(2)+'%'+arr[0]+' - ':''
                statusFoundArray[0].d=(indexArray[0]*30/MyChilds.length).toFixed(2)
                statusFoundArray[0].c='pink'
                let m1 = (indexArray[1]*100/MyChilds.length)!=0?(indexArray[1]*100/MyChilds.length).toFixed(2)+'%'+arr[1]+' - ':''
                statusFoundArray[1].d=((indexArray[1]*360/MyChilds.length)+(indexArray[0]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[1].c='rgb(126, 80, 250)'
                let m2 = (indexArray[2]*100/MyChilds.length)!=0?(indexArray[2]*100/MyChilds.length).toFixed(2)+'%'+arr[2]+' - ':''
                statusFoundArray[2].d=((indexArray[2]*360/MyChilds.length)+(indexArray[1]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[2].c='blue'
                let m3 = (indexArray[3]*100/MyChilds.length)!=0?(indexArray[3]*100/MyChilds.length).toFixed(2)+'%'+arr[3]+' - ':''
                statusFoundArray[3].d=((indexArray[3]*360/MyChilds.length)+(indexArray[2]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[3].c='green'
                let t = (indexArray[4]*100/MyChilds.length)!=0?(indexArray[4]*100/MyChilds.length).toFixed(2)+'%'+arr[4]+' - ':''
                statusFoundArray[4].d=((indexArray[4]*360/MyChilds.length)+(indexArray[3]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[4].c='yellow'
                let j = (indexArray[5]*100/MyChilds.length)!=0?(indexArray[5]*100/MyChilds.length).toFixed(2)+'%'+arr[5]+' - ':''
                statusFoundArray[5].d=((indexArray[5]*360/MyChilds.length)+(indexArray[4]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[5].c='orange'
                let e = (indexArray[6]*100/MyChilds.length)!=0?(indexArray[6]*100/MyChilds.length).toFixed(2)+'%'+arr[6]+' - ':''
                statusFoundArray[6].d=((indexArray[6]*360/MyChilds.length)+(indexArray[5]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[6].c='black'
                let h = (indexArray[7]*100/MyChilds.length)!=0?(indexArray[7]*100/MyChilds.length).toFixed(2)+'%'+arr[7]:''
                statusFoundArray[7].d=((indexArray[7]*360/MyChilds.length)+(indexArray[6]*360/MyChilds.length)).toFixed(2)
                statusFoundArray[7].c='red'
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
                MyChilds.length == 0?MyChilds.length =1:''
                statusFoundAzmoon = (miyangin/MyChilds.length).toFixed(2)+'%'
            
        }

        return res.status(200).json({st:statusFound,az:statusFoundAzmoon,wt:workstatusFound,stCircle:statusFoundArray})
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const getSudystatusRouted = async (req, res) => {
    const { searchQuery, doneTopics } = req.query

    let code = '02'
    try {
        const studentId = searchQuery
        // const topics = await riaziDavazdahom.find({ studentId })//studentId , topicsDetails
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
