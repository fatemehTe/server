import mongoose from "mongoose";

const studentHisBarnameHaftegiSchema = mongoose.Schema({
    studentId: {type: Number, required: true},// remember to fill manullay
    barnames: {type:Array, required: true}
    //Array of barname
    //barname: { row:Number, tarikh:String, roozehafte:Number, startTime:String
    // endTime:String, duration:String, workId:Number(0 rest,1 transportation,2 study,3 more),
    // description:String }
})
//barname haftegi ke student tayin mikonad ta zamanike khodash aan ra update nakarde
//moshaver az rooye aan barname iijad mikonad

export default mongoose.model('StudentHisBarnameHaftegi', studentHisBarnameHaftegiSchema)