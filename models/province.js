import mongoose from "mongoose";

const provinceSchema = mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    provinceId : {type: Number, required: true}
})

const province = mongoose.model('province', provinceSchema)

export default province;