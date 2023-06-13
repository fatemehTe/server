import mongoose from "mongoose";

const thisWeekTasksSchema = mongoose.Schema({
    studentId: {type: String, required: true},
    moshaverId: {type: String, required: true},
    weekStartDate: {type: String, required: true},
    firstWeekDateDayName: {type: Number, required: true},
    tasks: {type: Array, required: true}
    //an array of objects
    //objects:
    //{
    //topicId, topicRoute, topicWorkStatus, topicStatus(yadgiri, ...),
    //if testi: num od correct, num of none, num of false
    //}
})

const thisWeekTasks = mongoose.model('thisWeekTasks', thisWeekTasksSchema)

export default thisWeekTasks;