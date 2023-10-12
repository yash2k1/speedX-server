const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const category=require("./Routes/categoryRoutes");
const connectToDb=require("./db/config");

const app=express();
// const post=4040;
dotenv.config();
app.use(cors({
    origin:"*"
}));
app.use(express.json())

app.use("/",category);
(async()=>{
try{
    connectToDb();
    app.listen(process.env.PORT,()=>{
        console.log(`your server is live on ${process.env.PORT}`);
    });
}
catch(err){
    if(err)console.log(err)
}

})();
