import mongoose from "mongoose";

const ensaniFareghSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true},
    topicsAzmoon :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const ensaniFaregh = mongoose.model('ensaniFaregh', ensaniFareghSchema)

export default ensaniFaregh;