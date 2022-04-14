const express=require('express');
const users=require("./senders");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { send } = require('process');
const router=express.Router();
const connection=require('./mysql')
router.post("/signup",async(req,res)=>{
    try{
        // const checkuser=await users.find({email:req.body.email})
        
        if(checkuser.length>0){
            res.send('mail already registered');
            return;
        }
        const salt=await bcrypt.genSalt();
            const password=await bcrypt.hash(req.body.password,salt);
        const data= await users.create({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:password
        })
        res.send(data);
        return;
    }
    catch(err){
        res.send(err);
    }
})
router.get("/signin", async (req,res) => {
    try{
        const mail = await users.find({email:req.body.email});
        if(mail.length == 0 ) {
            res.send("wrong email");
            return;
        }
        const password = mail[0].password;
        const checkPass = await bcrypt.compare(req.body.password,password);
        console.log(checkPass);
        if(checkPass) {
            const token = jwt.sign({
                userid: mail[0]._id,
                email: mail[0].email,
            },process.env.jwt_key,{expiresIn: "5days"});
            res.send(token);
            return;
        }
        else {
            res.send("Wrong Password")
        }
    }
    catch(err) {
        res.send(err);
    }
})
router.get("/messages",async(req,res)=>{
    try{
        if(req.isAuth){
            const userdata=await users.findById(req.userid);
            const {sentmessages,receivedmessages}=userdata;
            let message={};
            let sentMgsData=[];
            sentmessages.forEach(async (msgId) => {
                const temp= await users.findById(msgId);
                sentMgsData.push(temp);
            });
            let receivedMgsData=receivedmessages.map(async(msgIds)=>{
                return await users.findById(msgIds)
            });
            users.sentmessages=sentMgsData;
            users.receivedmessages=receivedMgsData;
            res.send(users)
        }
        else{
            res.send({err:"please login"});
            return;
        }
    }
    catch(err){
        res.send(err);
        return;
    }
})
module.exports=router;