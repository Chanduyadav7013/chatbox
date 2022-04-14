const express=require('express');
const users=require("./receivers");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// const { send } = require('process');
const router=express.Router();
router.post("/sendmessaage/:receiverId",async(req,res)=>{
    try{
       if(req.isAuth){
         const date=new date();
         const messagedata=await message.create({
             sender:req.userId,
             receiver:req.params.receiverId,
             message:req.body.message,
             createdat:date
         });
         const sender=await users.findByIdAndUpdate(req.userId,{$push:{"sentmessages":messagedata._id}});
         const receiver=await findByIdAndUpdate(req.params.receiverId,{
             $push:{'receivedmessages':messagedata._id}
         });
         res.send(data);
       }
       else{
           res.send('please login');
           return;
       }
    }
    catch(err){
        res.send(err);
        return;
    }
})
module.exports=router;