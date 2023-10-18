const customers =require("../models/RegistrationModel")
const Product =require("../models/ProductModel")
// const {createOrder} =require("../papal-apis")
//add to cart
async function changestocart(req, res) {
    const userId = req.body.userId
    if(!userId) return res.send({msg:"enter your user id"});
    const productId = req.body.productId
    if(!productId) return res.send({msg:"enter your product id"});
    const qnt=parseInt(req.body.productQnt);
    const user = await customers.findById(userId);    
        if (!user) {
            return  res.status(200).send({ msg: "user not found" })
        }
        // clear whole cart
        if(productId==="clear"){
          console.log("clear",productId,"clean");
          const deleteCart=await customers.findByIdAndUpdate(userId,{cart:[]});
          user.save();
        return res.status(200).send({msg:"cart is empty",user:user,"deleted":deleteCart});
           } 
    const ProductData = await Product.findById(productId);    
       
       if (!ProductData) {
            // console.log('Productnotfound',productId)
            return  res.status(200).send({ msg: "Product not found" })
        }
// console.log("Product",ProductData);
        const cartItemIndex = user.cart.findIndex((item) => item.product.equals(productId))
        let result;
        if (cartItemIndex===-1){
            user.cart.push({ product: productId, quantity: qnt });
            user.save();
             result={msg: `cart updated by ${qnt}`};

           }
          
        // adding condtion quantity cant be in negative
       else if(user.cart[cartItemIndex].quantity+qnt<=0){
            user.cart= user.cart.filter((item)=>JSON.stringify(item)!== JSON.stringify(user.cart[cartItemIndex]));
            user.save();
             result={msg: "cart Item is remove"};
        }
       else if(qnt+ user.cart[cartItemIndex].quantity>ProductData.stock){

        user.cart[cartItemIndex].quantity =ProductData.stock;
        user.save();
           
             result={msg:"out of stock"};
        }
         else{
            user.cart[cartItemIndex].quantity +=qnt;
            console.log("pushed update")
             user.save();
            result={msg: `cart updated by ${qnt}`};
       
         }  
         const productData= await user.populate("cart.product");
         return res.status(200).send({ user:productData.cart,...result});
    
}
//getCart
async function getCart(req,res){
    try{
      const userId=req.params.userId;
      console.log(req.params ,"param")
      const user= await customers.findById(userId);
      if(!user){
        return res.status(404).send({msg:"user not found"});
      }
    const productData= await user.populate("cart.product");
      console.log("cart data",productData.cart)
      res.send({user:productData.cart,msg:"user cart data"});
    }
    catch(err){
        res.status(500).send({msg:"err"});
    }
}

// // place order
// app.post("/api/orders", async (req, res) => {
//   try {
//     // use the cart information passed from the front-end to calculate the order amount detals
//     const { cart } = req.body;
//     const { jsonResponse, httpStatusCode } = await createOrder(cart);
//     res.status(httpStatusCode).json(jsonResponse);
//   } catch (error) {
//     console.error("Failed to create order:", error);
//     res.status(500).json({ error: "Failed to create order." });
//   }
// });
module.exports={changestocart,getCart};