import mongoose from "mongoose";

const tajrobiDavazdahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const tajrobiDavazdahom = mongoose.model('tajrobiDavazdahom', tajrobiDavazdahomSchema)

export default tajrobiDavazdahom;