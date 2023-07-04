import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import provinceRoutes from './routes/provinces.js';
import cityRoutes from './routes/cities.js';
import educationTreeRoutes from './routes/educationTree.js';
import topicRoutes from './routes/topic.js';
import topicRoutesNew from './routes/topicNew.js';
import sampleTopicRoutes from './routes/sampleTopic.js';
import sampleTopicNewRoutes from './routes/sampleTopicNew.js';
import topicUsedRoutes from './routes/topicUsed.js';
import topicUsedRoutes2 from './routes/topicUsed2.js';
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

import studentsRowSampleGrandd from './routes/studentsRowSampleGrand.js'
import sampleTopicGrand from './routes/sampleTopicGrand.js';
import topicGrandChild from './routes/topicGrandChild.js';

import studentsRowSample from './routes/studentsRowSample.js';
import sampleTopicPrivate from './routes/sampleTopicPrivate.js';

import riaziDahom from './routes/riaziDahom.js';
import riaziYazdahom from './routes/riaziYazdahom.js';
import riaziDavazdahom from './routes/riaziDavazdahom.js';
import riaziFaregh from './routes/riaziFaregh.js';

import tajrobiDahom from './routes/tajrobiDahom.js';
import tajrobiYazdahom from './routes/tajrobiYazdahom.js';
import tajrobiDavazdahom from './routes/tajrobiDavazdahom.js';
import tajrobiFaregh from './routes/tajrobiFaregh.js';

import ensaniDahom from './routes/ensaniDahom.js';
import ensaniYazdahom from './routes/ensaniYazdahom.js';
import ensaniDavazdahom from './routes/ensaniDavazdahom.js';
import ensaniFaregh from './routes/ensaniFaregh.js';

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
app.use('/topicNew', topicRoutesNew);
app.use('/sampleTopic', sampleTopicRoutes);
app.use('/sampleTopicNew', sampleTopicNewRoutes);
app.use('/topicUsed', topicUsedRoutes);
app.use('/topicUsed2', topicUsedRoutes2);
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



app.use('/studentsRowSampleGrand', studentsRowSampleGrandd);
app.use('/sampleTopicGrand', sampleTopicGrand);
app.use('/topicGrandChild', topicGrandChild);

app.use('/studentsRowSample', studentsRowSample);
app.use('/sampleTopicPrivate', sampleTopicPrivate);

//riazi
app.use('/riaziDahom', riaziDahom);
app.use('/riaziYazdahom', riaziYazdahom);
app.use('/riaziDavazdahom', riaziDavazdahom);
app.use('/riaziFaregh', riaziFaregh);
//tajrobi
app.use('/tajrobiDahom', tajrobiDahom);
app.use('/tajrobiYazdahom', tajrobiYazdahom);
app.use('/tajrobiDavazdahom', tajrobiDavazdahom);
app.use('/tajrobiFaregh', tajrobiFaregh);
//ensani
app.use('/ensaniDahom', ensaniDahom);
app.use('/ensaniYazdahom', ensaniYazdahom);
app.use('/ensaniDavazdahom', ensaniDavazdahom);
app.use('/ensaniFaregh', ensaniFaregh);



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

