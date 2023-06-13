import mongoose from "mongoose";

const educationTreeSchema = mongoose.Schema({
    Id: {type: Number, required: true},
    Name: {type: String, required: true},
    ParentEducationTreeId : {type: Number, required: false}
})

const educationTree = mongoose.model('educationTree', educationTreeSchema)

export default educationTree;