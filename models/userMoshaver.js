import mongoose from "mongoose";

const userMoshaverSchema = mongoose.Schema({
    name: {type: String, required: false},
    familyName: {type: String, required: false},
    maghtaId: {type: Number, required: false},//moshaver universitymaghta
    //moshaver=> 0 bachlor, 1 master, 2 phd
    email: {type: String, required: false},
    profilePicture: {type: String, required: false},
    cityId: {type: String, required: false},//_id of city
    provinceId: {type: Number, required: false},//provinceId
    universityName: {type: String, required: false},
    universityFeild: {type: String, required: false},
    isStuding: {type: Number, required: false},//1 fareghotahsil, 0 daneshjoo
    studentIds: {type: Array, required: false},
    description: {type: String, required: false},
    sabeghe: {type: Number, required: false},// sal
    wholePosCount: {type: Number, required: false},// kolle zarfiyat
    emptyPosCount: {type: Number, required: false},// tedad khali
    bestDone: {type: String, required: false},// behtarin amalkard eg: 1 tajrobi 1401
    successDoneCount: {type: Number, required: false},// tedad moshaverehaye movafagh
    stars: {type: Number, required: false},
    userId: {type: String, required: true}// remember to fill manullay
})

export default mongoose.model('UserMoshaver', userMoshaverSchema)