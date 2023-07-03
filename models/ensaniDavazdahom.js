import mongoose from "mongoose";

const ensaniDavazdahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true},
    topicsAzmoon :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const ensaniDavazdahom = mongoose.model('ensaniDavazdahom', ensaniDavazdahomSchema)

export default ensaniDavazdahom;