import { Router } from "express";
import { CartManager } from "../cartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/:cartId", async (req, res) => {
  try {
    let { cartId } = req.params;
    const cart = await cartManager.getCart(cartId);
    if (cart) {
      res.status(200).json({ message: "Cart found successfully", cart });
    } else {
      res.status(400).json({ error: "There is no cart with that ID." });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await cartManager.createCart();
    res.status(201).json({ message: "Cart created successfully", product });
  } catch (error) {
    res.send(error);
  }
});

router.post("/:cartId/product/:productId", async (req, res) => {
  try {
    let {cartId, productId} = req.params;
    await cartManager.addProductToCart(cartId, productId);
    
    res.status(201).json({ message: "Product added successfully to cart"});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
