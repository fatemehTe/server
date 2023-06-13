import mongoose from "mongoose";

const userStudentSchema = mongoose.Schema({
    name: {type: String, required: false},
    familyName: {type: String, required: false},
    maghtaId: {type: Number, required: false},
    feildId: {type: Number, required: false},
    email: {type: String, required: false},
    profilePicture: {type: String, required: false},
    cityId: {type: Number, required: false},
    provinceId: {type: Number, required: false},
    schoolName: {type: String, required: false},
    moshaverIds: {type: Array, required: false},
    userId: {type: String, required: true}// remember to fill manullay
})

export default mongoose.model('UserStudent', userStudentSchema)