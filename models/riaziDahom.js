import mongoose from "mongoose";

const riaziDahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const riaziDahom = mongoose.model('riaziDahom', riaziDahomSchema)

export default riaziDahom;
