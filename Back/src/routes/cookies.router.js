import { Router } from "express";

const router = Router();

router.get('/create', (req, res)=> {
    res.cookie('primeraCookie', 'value de la primera cookie', {signed: true})
    .send('Cookie creada')
})

router.get('/listar', (req,res)=> {
    const {primeraCookie} = req.signedCookies
    res.json({cookies: {primeraCookie}})
})

router.get('/eliminar', (req, res)=> {
    res.clearCookie('Mi primera cookie').send('Cookie eliminada con exito')
})

export default router;