import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils/utils.js";
import { ProductManager } from "./DAL/daos/fileManagers/productManager.js";
import productsRouter from "./routes/products.router.js";
import productsRouter2 from "./routes/products2.router.js";
import cartsRouter from "./routes/carts.router.js";
import cartsRouter2 from "./routes/carts2.router.js";
import usersRouter2 from "./routes/users2.router.js"
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import messagesRouter from './routes/messages.router.js'
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { cartsModel } from "./DAL/models/carts.model.js";
import passport from "passport";
import './passport/passportStrategies.js'
import config from './config.js'
import { generateProducts } from "./utils/mocks/mocks.js";
import { errorMiddleware } from "./utils/errors/errors.middleware.js";
import logger from "./utils/logs/winston.js";

const PORT = config.port;
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secretCookie"));
app.use(session({
  store: new MongoStore({
    mongoUrl:config.mongo_uri
  }),
  resave:false,
  saveUninitialized:false,
  secret:'secretKey',
  cookie:{maxAge:30000}
}))

//Passport
app.use(passport.initialize())
app.use(passport.session())

//Managers
const productManager = new ProductManager();

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Routes
// app.use("/api/products", productsRouter2)
app.use("/products", productsRouter)
app.use("/api/products", productsRouter2)
app.use("/api/carts", cartsRouter2)
app.use("/api/users", usersRouter2)
app.use("/carts", cartsRouter)
app.use('/views', viewsRouter)
app.use('/users', usersRouter)
app.use('/messages', messagesRouter)
// app.use('/api/users', usersRouter2)
// app.use('/', (req,res)=> {
//   res.redirect('/views/login')
// })
app.get('/api/mockingproducts', (req,res)=> {
  const products = generateProducts()
  console.log(products);
  res.json(products)
}), 

app.get("/carts/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const cart = await cartsModel.findById(cartId).populate("products").lean();
  console.log(cart);
  const products = cart.products;
  console.log(products);
  res.render("productsRender", { products });
});

app.get("/loggerTest", async (req, res) => {
  logger.fatal("Logger fatal")
  logger.error("Logger error")
  logger.warning("Logger warn")
  logger.info("Logger info")
  logger.http("Logger http")
  logger.debug("Logger debug")
});


//Listen
app.use(errorMiddleware)
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
