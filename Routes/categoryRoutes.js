const category=require("express").Router();

const { findOneProduct,findCategory, uniqueSubCategory}=require("../controller/categoryControler");
const { Login, Register } = require("../controller/userController");
const userAuth = require("../middleware/userAuth");
category.get("/uniqueSubCategory",uniqueSubCategory);
category.get("/:category",findCategory);
category.get("/:category/:id",findOneProduct);
// category.get("/:category/:id",userAuth,findOneProduct);
category.post("/login",Login);
category.post("/signUp",Register);
// category.get("/:NewsId",userAuth,Id);

module.exports=category;

