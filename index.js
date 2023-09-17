const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const category=require("./Routes/category");
const app=express();
// const post=4040;
dotenv.config();
app.use(cors({
    origin:"*"
}));
app.use(express.json())
app.use("/",category);
app.get("/",(req,res)=>{
    console.log("agya")
    res.send("agya");
})
app.listen(process.env.port,()=>{
    console.log(`your server is live on ${process.env.port}`);
})