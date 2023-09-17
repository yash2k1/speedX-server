const category=require("express").Router();

const {Artical,Id}=require("../controller/categoryControler");
const { Login, Register } = require("../controller/userController");
const userAuth = require("../middleware/userAuth");
category.get("/Artical",Artical);
category.post("/Login",Login);
category.post("/Register",Register);
category.get("/:NewsId",userAuth,Id);
module.exports=category;

