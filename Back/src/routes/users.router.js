import { Router } from "express";
import { usersModel } from '../persistence/models/users.model.js'

const router = Router();

router.post('/registro', async(req,res)=> {
    const {email, password} = req.body
    const userExists = await usersModel.find({email, password})
    console.log(req.body);
    if (userExists.length !== 0) {
        res.redirect('/views/errorRegistro')
    } else {
        await usersModel.create(req.body)
        res.redirect('/views/login')
    }
})

router.post('/login', async(req,res)=> {
    const {email, password} = req.body;
    const user = await usersModel.find({email, password});
    console.log(user);
    if (user.length !== 0) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        req.session.logged = true
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.isAdmin = true
        } else {
            req.session.isAdmin = false
        }
        console.log(req.session);
        res.redirect('/views/products')
    } else {
        res.redirect('/views/errorLogin')
    }
})

router.get('/logout', async(req,res)=> {
    req.session.destroy((error)=> {
        if(error) {
        console.log(error);
        } else {
            res.redirect('/views/login')
        }
    })
})

export default router;