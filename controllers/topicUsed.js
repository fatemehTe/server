import mongoose from "mongoose"
import topicUsed from "../models/topicUsed.js";


export const getTopicByStudentIdAndTiocId = async (req, res) => {
    const {studentId} = req.query
    try {
        const existingElements = await topicUsed.find({ studentId:studentId})
        if (existingElements)
        res.status(200).json({ existingElements: existingElements })
    } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
    }
}

export const pushIntoTopics = async (req, res) => {
    const mainObject = req.body
    try {
        for (let i=0;i<mainObject.length;i++) {
          // Check if the element already exists in the database
          const existingElement = await topicUsed.findOne({ studentId:mainObject[i].studentId, TopicId:mainObject[i].TopicId });
    
          // If the element does not exist, save it to the database
          if (!existingElement) {
            const newElement = new topicUsed({ ...mainObject[i] });
            await newElement.save();
            // res.status(200).json({ newElement:newElement })
          }else{
            let topicInfo = existingElement.topicInfo
            mainObject[i].topicInfo.map((x)=>{
                topicInfo.push(x)
            })
            const updateResult = await topicUsed.updateOne({studentId:mainObject[i].studentId, TopicId:mainObject[i].TopicId},{$set:{
              topicInfo:topicInfo
          }})
        //   res.status(200).json({ updateResult:updateResult })
          }
        }
        res.status(200).json({ HI:'Hi' })
      } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
      }
}
export const updateTopicsNextStatus = async (req, res) => {
    const mainObject = req.body
    try {
        for (let i=0;i<mainObject.length;i++) {
            const updateResult = await topicUsed.updateOne({studentId:mainObject[i].studentId, TopicId:mainObject[i].TopicId},{$set:{
                studyStatusNext:mainObject[i].studyStatusNext
            }})
            // res.status(200).json({ updateResult:updateResult })
        }
        res.status(200).json({ done:'DONE' })
      } catch (error) {
        res.status(500).json({ message: 'something went wrong.' })
      }
}

export const createTopic = async (req, res) => {
    const topicGet = req.body;
    const newTopic = new topicUsed({ ...topicGet })
    try {
        await newTopic.save();
        res.status(201).json(newTopic)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}
export const getTopic = async (req, res) => {
    // res.send('GET WORKS!')
    try {
        const topicGet = await topicUsed.find()
        res.status(200).json(topicGet)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const deleteAllTopic = async (req, res) => {
    
    await topicUsed.deleteMany({})
    
}

export const deleteById = async (req, res) => {
    const {id} = req.params;
    await topicUsed.findByIdAndRemove(id)
    
}
 

 export const getTopicBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Title = searchQuery
        const topics = await topicUsed.find({ Title })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}
export const getTopicBySearchCode = async (req, res) => {
    const { searchQuery } = req.query
    try {
        // const Title = new RegExp(searchQuery.title, "i")
        const Id = searchQuery
        const topics = await topicUsed.find({ Id })
        res.json({ data: topics })
        res.status(200).json(topics)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}