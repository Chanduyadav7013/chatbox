const mongoose=require('mongoose')
const messageschema=new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        required:true
    },
})
module.exports=mongoose.model("receivers",messageschema);
// const{urlencoded,json}=require('express');
// const mongoose=require('mongoose');
// const app=express();
// const dotenv=require('dotenv');
// dotenv.config();