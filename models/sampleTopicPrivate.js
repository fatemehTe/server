import mongoose from "mongoose";

const sampleTopicPrivateSchema = mongoose.Schema({
    code: {type: String, required: true},//riazi 00 01 02 03 -tajrobi 10 11 12 13 14 -ensani 20 21 22 23 
    sampleTopicP: {type: Array, required: true}//array of:
    // DisplayPriority: {type: Number, required: true},
    // Id: {type: Number, required: true},
    // LessonId : {type: Number, required: true},
    // ParentTopicId : {type: Number, required: false},
    // Title : {type: String, required: true},
    // str: {type: String, required: false},
    // topicRoutes: {type: Array, required: true},
})

const sampleTopicPrivate = mongoose.model('sampleTopicPrivate', sampleTopicPrivateSchema)

export default sampleTopicPrivate;