const mongoose= require("mongoose")
const Schema=mongoose.Schema;
const ProductModel =new Schema({
    id: {type:Number, required:true,},
    title:{type:String, required:true,},
    description:{type:String, required:true,},
    price:{type:Number, required:true,},
    discountPercentage:{type:Number, max:100, required:true,},
    rating:{type:Number, max:5, min:0, required:true,},
    stock: {type:Number, required:true,},
    brand: {type:String, required:true,},
    category: {type:String, required:true,},
    thumbnail: {type:String, required:true,},
    images: {type:Array, required:true,},
    subCategory: {type:String, required:true,}
})
module.exports =mongoose.model("product",ProductModel)