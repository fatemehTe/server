import mongoose from "mongoose";

const topicGrandChildSchema = mongoose.Schema({
    DisplayPriority: {type: Number, required: true},
    Id: {type: Number, required: true},
    LessonId : {type: Number, required: true},
    ParentTopicId : {type: Number, required: false},
    Title : {type: String, required: true},
})

const topicGrandChild = mongoose.model('topicGrandChild', topicGrandChildSchema)

export default topicGrandChild;