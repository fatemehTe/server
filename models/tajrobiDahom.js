import mongoose from "mongoose";

const tajrobiDahomSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const tajrobiDahom = mongoose.model('tajrobiDahom', tajrobiDahomSchema)

export default tajrobiDahom;