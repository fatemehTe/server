import mongoose from "mongoose";

const riaziFareghSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const riaziFaregh = mongoose.model('riaziFaregh', riaziFareghSchema)

export default riaziFaregh;