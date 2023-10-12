const mongoose=require("mongoose");
const connectToDb=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("connect to db.."))
    .catch((err)=>console.log(err))
}

module.exports=connectToDb;