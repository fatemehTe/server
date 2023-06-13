import mongoose from "mongoose";

const topicSchema = mongoose.Schema({
    DisplayPriority: {type: Number, required: true},
    Id: {type: Number, required: true},
    LessonId : {type: Number, required: true},
    ParentTopicId : {type: Number, required: false},
    Title : {type: String, required: true},
})

const topic = mongoose.model('topic', topicSchema)

export default topic;