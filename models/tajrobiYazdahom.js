import mongoose from "mongoose";

const tajrobiYazdahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const tajrobiYazdahom = mongoose.model('tajrobiYazdahom', tajrobiYazdahomSchema)

export default tajrobiYazdahom;