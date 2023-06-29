import mongoose from "mongoose";

const riaziDavazdahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const riaziDavazdahom = mongoose.model('riaziDavazdahom', riaziDavazdahomSchema)

export default riaziDavazdahom;