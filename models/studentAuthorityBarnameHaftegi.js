import mongoose from "mongoose";

const studentAuthorityBarnameHaftegiSchema = mongoose.Schema({
    studentId: {type: String, required: true},// remember to fill manullay
    moshaverId: {type: String, required: true},// remember to fill manullay
    weekStartDate: {type: String, required: true},
    firstWeekDateDayName: {type: Number, required: true},
    //0->1sh - 1->2sh - ... - 7->sh
    barnames: {type:Array, required: true},
    moshaverComment: {type: String, required: false}
    //Array of barnameObject
    //barnameObject:{ roozeHafte:int ,tarikh:String ,barname:Array of { row:Number, tarikh:String, roozehafte:Number, startTime:String
    // endTime:String, durationTesti:String, durationTashrihi:String, topicId:Number, lessonId:Number
    // description:String, barnameType:0 yadgiri,1 moroor1,2 moroor2,3 moroor3,4 tasbit,5 jambandi, isTesti:Boolean, testCount:Number,
    // doneTestiTime:String, doneTashrihiTime:String, doneTestCorrect:Number, doneTestWrong:Number,
    // doneTestNone:Number, description:String, barnameIndex:Number, topicsRequiredRound:Number}}
})

export default mongoose.model('StudentAuthorityBarnameHaftegi', studentAuthorityBarnameHaftegiSchema)