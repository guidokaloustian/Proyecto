import express from "express";
import handlebars from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ProductManager } from "./productManager.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const PORT = 8080;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const productManager = new ProductManager();
const products = await productManager.getProducts();

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.get("/", (req, res)=> {
  res.render('home', {products});
})
app.get('/realtimeproducts', (req, res)=> {
  res.render('realTimeProducts', {products})
})

const httpServer = app.listen(PORT, () => {
  console.log(`Listen to port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=> {
  console.log('usuario conectado', socket.id);
  socket.on('disconnect', ()=> {
    console.log('Usuario desconectado');
  })

  socket.on('newProd', async ({title, description, category, price, thumbnails = "null", code, stock})=> {
    await productManager.addProduct(title, description, category, price, thumbnails, code, stock);
    const newProds = await productManager.getProducts();
    console.log(newProds);
    socketServer.emit('addedProducts', newProds);
  })

  socket.on('deleteProd', (async (productId)=> {
    const deleted = await productManager.deleteById(parseInt(productId));
    console.log(deleted);
    const products = await productManager.getProducts();
    await socketServer.emit('delProducts', products);
  }))

})
