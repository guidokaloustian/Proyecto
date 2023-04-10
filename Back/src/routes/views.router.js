import { Router } from "express";
import { productsModel } from "../DAL/models/products.model.js";
import { auth, isLogged } from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/registro', isLogged, (req,res)=> {
    res.render('registro')
})

router.get('/errorRegistro', (req,res)=> {
    res.render('errorRegistro')
})

router.get('/errorLogin', (req,res)=> {
    res.render('errorLogin')
})

router.get('/login', isLogged, (req,res)=> {
    res.render('login')
})

router.get('/password', (req, res) => {
    res.render('changePass')
})

router.get("/products"  , async (req, res) => {
    const products = await productsModel.find().lean();
    res.render('productsRender', { products, email:req.session.email});
  });

export default router;