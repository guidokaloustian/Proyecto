import { Router } from "express";
import { findById, findAll } from "../controllers/carts.controllers.js";

const router = Router()

router.get('/', findAll)
router.get('/:cartId', findById)

export default router