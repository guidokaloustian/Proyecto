import { Router } from "express";
import { create, findById, findAll } from "../controllers/products.controllers.js";

const router = Router()

router.get('/', create)
router.get('/getAll', findAll)
router.get('/:productId', findById)

export default router