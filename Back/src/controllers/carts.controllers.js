import { getAllCarts, getCartById, createCart, deleteAllProuctsFromCart } from "../services/carts.services.js";

export async function findById(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await getCartById(cartId);
      if (!cart) {
        res.status(200).json({ message: "Cart incorrect" });
      } else {
        res.status(200).json({ message: "Cart found", cart });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  export async function findAll (req, res) {
    try {
      const carts = await getAllCarts()    
      if (carts.length === 0) {
        res.status(200).json({ message: "No carts" });
      } else {
        res.status(200).json({ message: "Carts found", carts });
      }
    } catch (error) {
      res.status(500).json({message: error});
    }
  }