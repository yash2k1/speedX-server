const data=require("../Routes/newsData");
const Artical=(req,res)=>{
 res.send(data);
 }
const Id=(req,res)=>{
    
    const CategoryData= data[ req.params.NewsId];
    console.log(req.params.NewsId,CategoryData)
 res.send(CategoryData);
 }

module.exports={Artical,Id};