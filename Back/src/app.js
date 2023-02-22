import express from "express";
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import { ProductManager } from "./persistence/daos/fileManagers/productManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import './persistence/dbConfig.js'

const PORT = 8080;
const app = express();
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//Managers
const productManager = new ProductManager();

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.get("/", (req, res)=> {
  res.render('home', {products});
})
app.get('/realtimeproducts', (req, res)=> {
  res.render('realTimeProducts', {products})
})

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});