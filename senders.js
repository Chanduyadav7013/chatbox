const mongoose=require('mongoose');
const usersschema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
sentmessages:{
    type:[String],
    required:false
},
receivedmessages:{
    type:[String],
    required:false
},
});
module.exports=mongoose.model("senders",usersschema);