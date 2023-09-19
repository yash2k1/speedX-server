const arr=require("../asset/Data");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
let saltRound=10;
// let secreateKey="fvsdsd";
const Register=(req,res)=>{
    const bodyData=req.body;
if(bodyData.name.length==0)return res.send("");
    const find=arr.find(item=>item.email===bodyData.email);
    if(find){
return res.status(200).send("your already registered");
    }
    let originalPassword=bodyData.password;
    const encryptedPassword=bcrypt.hashSync(originalPassword,saltRound);
    arr.push({...bodyData,"password":encryptedPassword});
   const token= jwt.sign({email:bodyData.email},process.env.secreatKey,{expiresIn:"3600 s"});
    console.log(arr);
res.status(200).send({"message":"you are registered",
"token":token});
}
const Login=(req,res)=>{
    const bodyData=req.body;
    if(bodyData.email.length==0)return res.send("");
    const find=arr.find(item=>item.email===bodyData.email);
    if(!find){
        res.status(401).send({"message":"you are not registered"});
    }
   if(arr.password!==bodyData.password){
    return res.send("password is incorrect");
   }
   const token= jwt.sign({email:bodyData.email},process.env.secreatKey,{expiresIn:"3600 s"});

    res.status(200).send({"message":`your are Login `,
"token":token});
}
module.exports={Register,Login};