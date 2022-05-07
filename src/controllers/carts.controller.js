import { cartService, productService} from "../services/services.js";

const getCartById = async(req,res) =>{
    let id = req.params.cid;
    let cart = await cartService.getByWithPopulate({_id:id})
    res.send({status:"success",payload:cart})
}
const addProduct = async(req,res)=>{
    let {cid,pid} = req.params;
    let {quantity} = req.body;
    console.log(quantity);
    //Check if product exists
    let product = await productService.getBy({_id:pid});
    if(!product) return res.status(404).send({status:"error",error:"Product not found"});
    //check if cart exists
    let cart = await cartService.getBy({_id:cid});
    if(!cart) return res.status(404).send({status:"error",error:"Cart not found"});
    //Check product stock
    if(product.stock===0) return res.status(400).send({status:"error",error:"No stock"});
    //Remove stock
    product.stock = product.stock - quantity;
    await productService.update(product);
    //Add product to cart
    // cart.products.push({product:pid,quantity});
    // await cartService.update(cart);
    res.send({status:"success",message:"Product added"})
}

export default {
    getCartById,
    addProduct
}