const mongoose= require("mongoose")
const Schema=mongoose.Schema;
const RegisterModel =new Schema({
    name:{type:String, required:true},
    phoneNo:{type:Number, maxlength:13,required:true},
    email:{type:String, maxlength:20,unique:true,required:true},
    password:{type:String,required:true},
})
module.exports =mongoose.model("users",RegisterModel)