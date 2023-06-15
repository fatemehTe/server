import mongoose from "mongoose";

const sampleTopicSchema = mongoose.Schema({
    DisplayPriority: {type: Number, required: true},
    Id: {type: Number, required: true},
    LessonId : {type: Number, required: true},
    ParentTopicId : {type: Number, required: false},
    Title : {type: String, required: true},
})

const sampleTopic = mongoose.model('sampleTopic', sampleTopicSchema)

export default sampleTopic;