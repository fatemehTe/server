import mongoose from "mongoose";

const studentsRowSampleSchema = mongoose.Schema({
    code: {type: String, required: true},//riazi 00 01 02 03 -tajrobi 10 11 12 13 14 -ensani 20 21 22 23 
    topicsDetails: {type: Array, required: true}
    //array of floats
})

const studentsRowSample = mongoose.model('studentsRowSample', studentsRowSampleSchema)

export default studentsRowSample;