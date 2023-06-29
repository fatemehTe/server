import mongoose from "mongoose";

const topicNewSchema = mongoose.Schema({
    DisplayPriority: {type: Number, required: true},
    Id: {type: Number, required: true},
    LessonId : {type: Number, required: true},
    ParentTopicId : {type: Number, required: false},
    Title : {type: String, required: true},
})

const topicNew = mongoose.model('topic', topicNewSchema)

export default topicNew;