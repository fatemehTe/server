import mongoose from "mongoose";

const azmoonSchema = mongoose.Schema({
    studentId : {type: Number, required: true},
    tarikh: {type: String, required: true},
    azmoonName: {type: String, required: true},
    azmoonType : {type: Number, required: false},//0 weekly,1 jame
    lessons : {type: Array, required: true}
    //Array of {lessonId:Number, darsadCorrect:Number}
})
//agar azmoon, azmoone akhare hafte ast pas dars shamele mabahesi ast ke dar in hafte 
//moshaver baraye student tayin karde ast v agar jame ast, azmoon shamele tamame mabahes
//ta konoon ast

export default mongoose.model('Azmoon', azmoonSchema)