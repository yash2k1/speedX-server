// customers.create({
//     name:req.body.name,
//     phoneNo:req.body.phoneNo,
//     email:req.body.email,
//     password:req.body.password
// })
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const customers =require("../models/RegistrationModel")
let saltRound=10;
// let secreateKey="fvsdsd";
// const call=(req,res)=>{
//     customers.collection.dropIndex({phoneNo:1},(err,result)=>{
//        if(err) console.log(err)
//        else console.log(result)
//     })
// }
const Register=async (req,res)=>{
   try{ 
    const bodyData=req.body;
if(bodyData.name.length==0)return res.send("");
    const find=await customers.findOne({email:bodyData.email});
    console.log("nice",find)

    if(find){
return res.status(200).send({"message":"your already registered"});
    }

    let originalPassword=bodyData.password;
    const encryptedPassword=bcrypt.hashSync(originalPassword,saltRound);
   const newUser=await customers.create({...bodyData,password:encryptedPassword});
   const token= jwt.sign({email:bodyData.email},process.env.secreatKey,{expiresIn:"3600 s"});
res.status(200).send({"message":"user is created","msg":newUser,
"token":token});
}
catch(err){
    console.log(err);
    res.send({"message":"error"});
}
}
const Login=async (req,res)=>{
   try{
     const bodyData=req.body;
    if(bodyData.email.length==0)return res.send("");
    const find=await customers.findOne({email:bodyData.email});
    console.log(find)
    if(!find){
       return res.status(200).send({"message":"you are not registered"});
    }
    let isPassCorrect=bcrypt.compareSync(bodyData.password,find.password);
    console.log(isPassCorrect);
       if(!isPassCorrect){
    return res.send({"message":"password is incorrect"});
   }
   const token= jwt.sign({email:bodyData.email},process.env.secreatKey,{expiresIn:"3600 s"});

    res.status(200).send({"message":`your are Login `,
"token":token,"name":find.name,"id":find._id});
}
catch(err){
    console.log(err);
    res.send({"message":"error"});
}
}
module.exports={Register,Login};