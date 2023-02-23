import { Router } from "express";
import CartsManager from '../persistence/daos/mongoManagers/cartsMongoManager.js';

const router = Router();
const cartsManager = new CartsManager();

router.get("/:cartId", async (req, res) => {
  try {
    let { cartId } = req.params;
    const cart = await cartsManager.getCartById(cartId);
    if (cart) {
      res.status(200).json({ message: "Cart found successfully", cart });
    } else {
      res.status(400).json({ error: "There is no cart with that ID." });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get('/', async(req, res) =>{
  try {
    const carts = await cartsManager.getAll();
    res.json({carts})
  } catch (error) {
    console.log(error);
  }
})

router.post("/", async (req, res) => {
  try {
    await cartsManager.createCart();
    res.json({message: 'Cart created succesfully'})
  } catch (error) {
    console.log(error);
  }
});

router.post('/addProduct', async (req,res)=> {
  try {
    const {cartId, productId} = req.body;
    const cart = await cartsManager.getCartById(cartId);
    cart.products.push(productId);
    cart.save();
    res.json({message: 'Product added succesfully'})
  } catch (error) {
    
  }
})

router.put("/:cartId", async (req, res) => {
  try {
    const {cartId} = req.params;
    const {newArray} = req.body;
    await cartsManager.updateCart(cartId, newArray);
    res.status(200).json({ message: "Products replaced succesfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:cartId/products/:productId", async (req, res) => {
  try {
    let {cartId, productId} = req.params;
    const product = await cartsManager.deleteProductFromCart(cartId, productId);
    res.status(200).json({ message: "Product deleted successfully from cart", product });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
