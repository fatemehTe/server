import mongoose from "mongoose";

const sampleTopicSchema = mongoose.Schema({
    DisplayPriority: {type: Number, required: true},
    Id: {type: Number, required: true},
    LessonId : {type: Number, required: true},
    ParentTopicId : {type: Number, required: false},
    Title : {type: String, required: true},
    str: {type: String, required: false},
    topicRoutes: {type: Array, required: true}
})

const sampleTopic = mongoose.model('sampleTopic', sampleTopicSchema)

export default sampleTopic;