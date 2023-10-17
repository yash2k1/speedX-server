
const product =require("../models/ProductModel")

 //find 
//find the data of every sub category
 const uniqueSubCategory=async(req,res)=>{
    try{
        // req.params.category
      const uniqueSubCategory=  await product.find();
      if(uniqueSubCategory.length===0){
        throw new Error("this category is not exist");
      }
      const uniqueSubCaetegoryData= uniqueSubCategory.filter((item,index)=> {
       return index==uniqueSubCategory.findIndex(obj=>{
            return JSON.stringify(item.subCategory)===JSON.stringify(obj.subCategory)
        })});
     res.status(200).send({"msg":uniqueSubCaetegoryData})
     console.log(uniqueSubCaetegoryData)
    }
catch(err){
    // console.log(err)
    res.status(500).send({"msg":err})
}
 }
//  find by category
const findCategory=async(req,res)=>{
    try{
        console.log(req.query.subCategory,req.params.category)
    
        let query={"category":req.params.category};
        // checking is there is any subCategory on the category or not
        if(req.query.subCategory){
        query={"category":req.params.category,
               "subCategory":req.query.subCategory};
        }
      const subCategoryData=  await product.find(query);
      // checking is there is any filer on the category or not
if(req.query.sortBy){
    req.query.sortBy==="rating"&&subCategoryData
    .sort( (a,b)=> b.rating-a.rating);
    req.query.sortBy==="priceHtoL"&&subCategoryData
    .sort( (a,b)=> b.price-a.price);
    req.query.sortBy==="priceLtoH"&&subCategoryData
    .sort( (a,b)=> a.price-b.price);
    req.query.sortBy==="highDiscount"&&subCategoryData
    .sort( (a,b)=> b.discountPercentage-a.discountPercentage);
}
     res.status(200).send({"msg":subCategoryData})
    }
catch(err){
    console.log(err)
    res.status(500).send({"msg":"Error in geting data"})
}
 }
//  find by regex 
const findByRegex=async(req,res)=>{
    try{
        const title=req.params.title;
        const regex=new RegExp(title,'i');
        // const regex=`/^p/i`;
        console.log(title)
        const productData= await product.find({"title":{ $regex:regex }});
        console.log("productData",productData)
     res.status(200).send({"msg":productData})
    }
catch(err){
    console.log("call err",err)
    res.status(500).send({"msg":err})
}
 }

 //  find by id (one product at a time)
const findOneProduct=async(req,res)=>{
    try{
        console.log("call")
       const productData= await product.findOne({"id":req.params.id});
     res.status(200).send({"msg":productData})
    }
catch(err){
    console.log("call err",err)

    res.status(500).send({"msg":err})
}
 }


module.exports={
    findOneProduct,
    findCategory,
    uniqueSubCategory,
    findByRegex
};