import { productService } from "../services/services.js"

const getAllProducts = async(req,res)=>{
    let products = await productService.getAll();
    res.send({status:"success",payload:products})
}
const getProductById = async(req,res)=>{
    let id = req.params.pid;
    let product = await productService.getBy({_id:id})
    if(!product) res.status(404).send({status:"error",error:"Not found"})
    res.send({status:"success",payload:product})
}

export default {
    getAllProducts,
    getProductById
}