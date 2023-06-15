import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import provinceRoutes from './routes/provinces.js';
import cityRoutes from './routes/cities.js';
import educationTreeRoutes from './routes/educationTree.js';
import topicRoutes from './routes/topic.js';
import topicUsedRoutes from './routes/topicUsed.js';
import studentTopicStatusRoutes from './routes/studentTopicStatus.js';
import questionRoutes from './routes/questions.js';
import karbarRoutes from './routes/karbar.js';
import azmoonRoutes from './routes/azmoon.js';
import userStudentRoutes from './routes/userStudent.js';
import userMoshaverRoutes from './routes/userMoshaver.js';
import studentHisBarnameHaftegiRoutes from './routes/studentHisBarnameHaftegi.js';
import studentAuthorityBarnameHaftegiRoutes from './routes/studentAuthorityBarnameHaftegi.js';
import userRoutes from './routes/users.js';
import thisWeekTasks from './routes/thisWeekTasks.js';
import * as path from 'path';
// import dotenv from 'dotenv';

const app = express()
// dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use(cors());
app.use('/posts', postRoutes);
app.use('/provinces', provinceRoutes);
app.use('/cities', cityRoutes);
app.use('/educationTree', educationTreeRoutes);
app.use('/topic', topicRoutes);
app.use('/topicUsed', topicUsedRoutes);
app.use('/studentTopicStatus', studentTopicStatusRoutes);
app.use('/question', questionRoutes);
app.use('/karbar', karbarRoutes);
app.use('/azmoon', azmoonRoutes);
app.use('/userStudent', userStudentRoutes);
app.use('/userMoshaver', userMoshaverRoutes);
app.use('/studentHisBarnameHaftegi', studentHisBarnameHaftegiRoutes);
app.use('/studentAuthorityBarnameHaftegi', studentAuthorityBarnameHaftegiRoutes);
app.use('/user', userRoutes);
app.use('/thisWeekTasks', thisWeekTasks);


// const CONNECTION_URL = 'mongodb+srv://Fateme:misisisimi1@nodeexpressproject.vb2rj.mongodb.net/?retryWrites=true&w=majority'
// const CONNECTION_URL = 'mongodb+srv://Fateme:misisisimi1@cluster0.kisjfkv.mongodb.net/?retryWrites=true&w=majority'

const CONNECTION_URL = 'mongodb://localhost'

const PORT = process.env.PORT || 5000;
app.get('/', function(req, res){
    res.send("Hello from the 'test' URL");
});
mongoose.set('strictQuery',false)
mongoose.connect(CONNECTION_URL,{ useNewUrlParser:true,useUnifiedTopology:true })
.then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
.catch((error)=> console.log(error))

// mongoose.set('useFindAndModify', false);