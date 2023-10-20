require("dotenv").config();
const stripe=require("stripe")(process.env.STRIPE_SECRET);
console.log("env#######################",process.env.PORT,process.env.STRIPE_SECRET);
const checkout =async(req,res)=>{
    try {
        {
            const products = req.body.products;
            console.log("nice",products) 
            const lineItems = products.map((item)=>({
                price_data:{
                    currency:"INR",
                    product_data:{
                        name:item.product.title,
                        images:[item.product.thumbnail]
                    },
                    unit_amount:((item.product.price*(100-item.product.discountPercentage) +(100/item.quantity))* 100),
                },
                quantity:item.quantity
            }));
        
            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                line_items:lineItems,
                mode:"payment",
                success_url:"https://speedx-yash.netlify.app/sucess",
                cancel_url:"https://speedx-yash.netlify.app/cancel",
            });
        
            res.json({id:session.id})
         
        }
    } catch (err) {
        console.log(err);
       res.send(err);
    }
}

module.exports={checkout};
