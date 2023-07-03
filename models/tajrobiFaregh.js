import mongoose from "mongoose";

const tajrobiFareghSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    topicsDetails :{type: Array, required: true},
    topicsAzmoon :{type: Array, required: true}
    //{topicId, studyStatusNext, workStatus}
})

const tajrobiFaregh = mongoose.model('tajrobiFaregh', tajrobiFareghSchema)

export default tajrobiFaregh;