import express from 'express';
import { ProductManager } from './productManager.js';

const PORT = 8080;
const app = express();
const productManager = new ProductManager();

app.get("/products", async (req, res)=> {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit);
    res.json({products})
})

app.get("/products/:productId", async (req, res)=> {
    let {productId} = req.params;
    const product = await productManager.getById(productId);
    res.json({product});
})

app.listen(PORT, ()=> {
    console.log(`Escuchando al puerto ${PORT}`);
})
