import mongoose from "mongoose";

const karbarSchema = mongoose.Schema({
    mobile: {type: Number, required: true},
    password: {type: String, required: true}, 
    userType: {type: Number, required: true},// 0 student, 1 moshaver
})

export default mongoose.model('Karbar', karbarSchema)