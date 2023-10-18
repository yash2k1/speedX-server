const category=require("express").Router();

const { changestocart, getCart } = require("../controller/cartController");
const { findOneProduct,findCategory, uniqueSubCategory, findByRegex}=require("../controller/categoryControler");
const { checkout } = require("../controller/paymentController");
const { Login, Register } = require("../controller/userController");
const userAuth = require("../middleware/userAuth");
category.get("/uniqueSubCategory",uniqueSubCategory);
category.get("/search/:title",findByRegex);
category.post("/changestocart",changestocart);
category.get("/getCart/:userId",userAuth,getCart);
category.post("/login",Login);
category.post("/signUp",Register);
category.post("/checkout",checkout);
category.get("/:category",findCategory);
// category.get("/:category/:id",findOneProduct);
category.get("/:category/:id",userAuth,findOneProduct);

module.exports=category;

