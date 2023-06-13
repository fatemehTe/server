import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    //name of the person who has loggedin
    name: String,
    selectedFile: String,
    likes:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});
const postMessage = mongoose.model('PostMessage', postSchema)

export default postMessage;