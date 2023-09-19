const jwt =require("jsonwebtoken");
const userAuth=(req,res,next)=>{
const bearer=req.headers["authorization"];
if(bearer==undefined){
    return res.status(401).send("no token");
}
const token=bearer.split(" ")[1];
// console.log(token);
if(!token){
    return res.status(401).send("user is not authorized");
}
// console.log(token)
const validate=jwt.verify(token,process.env.secreatKey,(err,res)=>{
    if(err){
        console.log(err.message)
        return `token expired`;
    }
    return res;
});
if(validate==="token expired"){
   return res.send({err:"token expired"});
}
if(validate){
    return next();
}
return res.status(401).send ("not authried for this resourse");
};
module.exports=userAuth;