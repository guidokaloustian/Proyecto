import { Router } from "express";
import { create, find, deleteUserById } from "../controllers/users.controllers.js";

const router = Router()

router.post('/', create)
router.get('/user', find)
router.get('/:userId', deleteUserById)

export default router