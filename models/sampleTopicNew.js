import mongoose from "mongoose";

const sampleTopicNewSchema = mongoose.Schema({
    DisplayPriority: {type: Number, required: true},
    Id: {type: Number, required: true},
    LessonId : {type: Number, required: true},
    ParentTopicId : {type: Number, required: false},
    Title : {type: String, required: true},
    topicRoutes: {type: Array, required: true}
})

const sampleTopicNew = mongoose.model('sampleTopicNew', sampleTopicNewSchema)

export default sampleTopicNew;