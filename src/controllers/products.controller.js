import { productService } from "../services/services.js"
const getAllProducts = async(req,res)=>{
    let products = await productService.getAll();
    res.send({status:"success",payload:products})
}


export default {
    getAllProducts
}