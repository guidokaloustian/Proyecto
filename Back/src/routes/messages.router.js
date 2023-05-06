import { Router } from "express";
import { transporter } from "../utils/messages/nodemailer.js";

const router = Router()

router.get('/', async (req, res)=> {
    try {
        await transporter.sendMail({
            from: 'CoderProject',
            to: 'catalinaluzf20@gmail.com',
            subject: 'Prueba proyecto',
            text: 'Prueba desde nodemailer'
        })
        res.send('Mail sent')        
    } catch (error) {
        console.log(error);
    }
})

export default router