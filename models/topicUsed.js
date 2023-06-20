import mongoose from "mongoose";

const topicUsedSchema = mongoose.Schema({
    TopicId: {type: Number, required: true},
    topicRoutes: {type: Array, required: true},
    studentId: {type: String, required: true},
    topicInfo: {type: Array, required: true},
    //array of objects:
    //object:{learnStatus:'v',date:'2.2.1402', studyStatus:'Done'}
    love : {type: Number, required: false},
    authority : {type: Number, required: false},
    studyStatusNext: {type: Number, required: true},
    workStatus: {type: Number, required: true}
    //the next status that the moshaver set for the next task
})

const topic = mongoose.model('topicUsed', topicUsedSchema)

export default topic;