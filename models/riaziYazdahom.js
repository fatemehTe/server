import mongoose from "mongoose";

const riaziYazdahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const riaziYazdahom = mongoose.model('riaziYazdahom', riaziYazdahomSchema)

export default riaziYazdahom;