import {
  getAllCarts,
  getCartById,
  createCart,
  deleteAllProuctsFromCart,
  purchase,
  addProductToCart
} from "../services/carts.services.js";

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

export async function findAll(req, res) {
  try {
    const carts = await getAllCarts();
    if (carts.length === 0) {
      res.status(200).json({ message: "No carts" });
    } else {
      res.status(200).json({ message: "Carts found", carts });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function create(req, res) {
  try {
    const cart = await createCart();
    res.status(200).json({ message: "Cart created", cart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function addToCart(req,res) {
  try {
    const {cartId, productId} = req.body;
    const cart = await addProductToCart(cartId, productId);
    res.status(200).json({ message: "Product added", cart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function deleteAllFromCart(req,res) {
  try {
    const cart = await deleteAllFromCart();
    res.status(200).json({ message: "Products succesfully deleted", cart });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function endPurchase (req, res) {
  try {
    const { cartId } = req.params
    const { email } = req.body;
    const ticket = await purchase(cartId, email)
    res.status(200).json({ message: "Ticket created", ticket });
  } catch (error) {
    res.status(500).json({message: error});
  }
}