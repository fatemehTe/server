import mongoose from "mongoose";

const ensaniYazdahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const ensaniYazdahom = mongoose.model('ensaniYazdahom', ensaniYazdahomSchema)

export default ensaniYazdahom;