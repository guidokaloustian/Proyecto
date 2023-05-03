import { Router } from "express";
import { findById, findAll, addToCart, deleteAllFromCart, endPurchase } from "../controllers/carts.controllers.js";

const router = Router()

router.get('/', findAll)
router.get('/:cartId', findById)
router.post('/addToCart', addToCart)
router.delete('/delete', deleteAllFromCart)
router.get('/:cartId/purchase', endPurchase)

export default router