import mongoose from "mongoose";

const ensaniDahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const ensaniDahom = mongoose.model('ensaniDahom', ensaniDahomSchema)

export default ensaniDahom;