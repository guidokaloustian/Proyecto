import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { ProductManager } from "./persistence/daos/fileManagers/productManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./persistence/dbConfig.js";
import { productsModel } from "./persistence/models/products.model.js";
import { cartsModel } from "./persistence/models/carts.model.js";

const PORT = 8080;
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secretCookie"));
app.use(session({
  store: new MongoStore({
    mongoUrl:'mongodb+srv://guidok:guidok@cluster0.fkpiocz.mongodb.net/e-commerce?retryWrites=true&w=majority'
  }),
  resave:false,
  saveUninitialized:false,
  secret:'secretKey',
  cookie:{maxAge:30000}
}))

//Managers
const productManager = new ProductManager();

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/views', viewsRouter)
app.use('/users', usersRouter)
app.use('/', (req,res)=> {
  res.redirect('/views/login')
})

app.get("/carts/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const cart = await cartsModel.findById(cartId).populate("products").lean();
  console.log(cart);
  const products = cart.products;
  console.log(products);
  res.render("productsRender", { products });
});


//Listen
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
