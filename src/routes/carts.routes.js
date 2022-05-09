import express from 'express';
import cartController from '../controllers/carts.controller.js'

const router = express.Router();

router.get('/:cid',cartController.getCartById)
router.put('/:cid/',cartController.updateCart)
router.post('/:cid/products/:pid',cartController.addProduct)
router.delete('/:cid/products/:pid',cartController.deleteProductFromCart)

export default router;