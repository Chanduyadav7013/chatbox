const express=require('express');
const{urlencoded,json}=require('express');
const mongoose=require('mongoose');
const auth=require('./auth')
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const userrouter=require('./sender')
const receiverouter=require('./receiver');
mongoose.connect(process.env.mongodb_string);
app.use(json());
app.use(urlencoded({extended:false}));
app.use(auth);
app.use('/sender',userrouter)
app.use('/receiver',receiverouter)
app.listen(process.env.PORT||5000);
