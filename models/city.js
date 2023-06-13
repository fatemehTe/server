import mongoose from "mongoose";

const citySchema = mongoose.Schema({
    name: {type: String, required: true},
    provinceId : {type: Number, required: true}
})

const city = mongoose.model('city', citySchema)

export default city;