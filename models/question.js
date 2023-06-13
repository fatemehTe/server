import mongoose from "mongoose";
const node = {
    Id: 0,
    Name: '',
    Value: '',
    State: 0
}
const questionSchema = mongoose.Schema({
    LessonId: {type: Number, required: true},
    Fasl: {type: Number, required: true},
    AnswerNumber: {type: Number, required: true},
    Code: {type: Number, required: true},
    Context: {type: String, required: true},
    Description: {type: String, required: false},
    FileName: {type: String, required: true},
    Id: {type: Number, required: true},
    InsertDateTime: {type: String, required: true},
    IsActive: {type: Boolean, required: true},
    IsDelete: {type: Boolean, required: true},
    IsHybrid: {type: Boolean, required: true},
    IsShowAnswer: {type: Boolean, required: true},
    IsStandard: {type: Boolean, required: true},
    LookupId_AreaType: {type: Number, required: false},
    LookupId_AuthorType: {type: Number, required: false},
    LookupId_QuestionHardnessType: {type: Number, required: false},
    LookupId_QuestionRank: {type: Number, required: false},
    LookupId_QuestionType: {type: Number, required: false},
    LookupId_RepeatnessType: {type: Number, required: false},
    Lookup_AreaTypes: {type: Array, required: false},
    Lookup_AuthorType: {type: Object, required: false},
    Lookup_QuestionHardnessType: {type: Object, required: false},
    Lookup_QuestionRank: {type: Object, required: false},
    Lookup_QuestionType: {type: Object, required: false},
    Lookup_RepeatnessType: {type: Object, required: false},
    QuestionAnswers: {type: Array, required: false},
    QuestionNumber: {type: Number, required: false},
    QuestionPicturePath: {type: String, required: true},
    QuestionPoint: {type: Number, required: false},
    QuestionWordPath: {type: String, required: true},
    ResponseSecond: {type: Number, required: false},
    SupervisorUserId: {type: Number, required: false},
    Supervisors: {type: Array, required: false},
    Tags: {type: Array, required: false},
    TopicAnswer: {type: Array, required: false},
    Topics: {type: Array, required: false},
    UseEvaluation: {type: Boolean, required: true},
    UserId: {type: Number, required: false},
    Writer: {type: Object, required: false},
    WriterId: {type: Number, required: false}
})

const question = mongoose.model('question', questionSchema)

export default question;