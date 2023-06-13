import mongoose from "mongoose";

const studentTopicStatusSchema = mongoose.Schema({
    studentId: {type: Number, required: true},
    topicId : {type: Number, required: true},
    lessonId : {type: Number, required: true},
    topicRequiredRound : {type: Number, required: true},
    //number of rounds need a topic to be mentioned to be done
    topicPassedRoundStatus : {type: Number, required: true},
    //number of rounds a topic has done
    topicLearningStatus : {type: Number, required: true},
    //0 yadgiri,1 yadavari,2 tasbit
    topicProccessStatus : {type: Number, required: true},
    //0 shoroo nashode,1 dar hal takmil,2 etmam,3 hazf
    
})

const topic = mongoose.model('StudentTopicStatus', studentTopicStatusSchema)

export default topic;