import { Router } from "express";
import { create, findById, findAll } from "../controllers/products.controllers.js";

const router = Router()

router.get('/', create)
router.get('/products', findAll)
router.get('/:cartId', findById)

export default router