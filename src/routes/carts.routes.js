import express from 'express';
import cartController from '../controllers/carts.controller.js'

const router = express.Router();

router.get('/:cid',cartController.getCartById)


export default router;