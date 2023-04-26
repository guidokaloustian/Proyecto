import CartsMongoManager from "../DAL/daos/mongoManagers/cartsMongoManager.js";
import ProductsMongoManager from "../DAL/daos/mongoManagers/productsMongoManager.js";
import TicketsMongoManager from "../DAL/daos/mongoManagers/ticketsMongoManager.js";

const cartsManager = new CartsMongoManager()
const productsManager = new ProductsMongoManager()
const ticketsManager = new TicketsMongoManager()

export async function getAllCarts() {
    try {
        const carts = await cartsManager.getAll()
        return carts
    } catch (error) {
        return error;
    }
}

export async function getCartById(cartId) {
    try {
        const cart = await cartsManager.getCartById(cartId)
        return cart
    } catch (error) {
        return error;
    }
}

export async function createCart(objCart) {
    try {
        const cartCreated = await cartsManager.createCart(objCart)
        return cartCreated
    } catch (error) {
        return error;
    }
}

export async function updateCart(cartId, newArray) {
    try {
        const cartUpdated = await cartsManager.updateCart(cartId, newArray)
        return cartUpdated
    } catch (error) {
        return error;
    }
}

export async function deleteAllProuctsFromCart(cartId) {
    try {
        const cart = await cartsManager.deleteAllProuctsFromCart(cartId)
        return cart
    } catch (error) {
        return error;
    }
}

export async function deleteProductFromCart(cartId, productId) {
    try {
        const cart = await cartsManager.deleteProductFromCart(cartId, productId)
        return cart
    } catch (error) {
        return error;
    }
}

export async function addProductToCart(cartId, productId) {
    try {
      const cart = await cartsManager.getCartById(cartId);
      if (!cart) return res.json({messae: 'Cart not found'})
      const product = await productsManager.getProductById(productId)
      if(!product || product.stock === 0) return res.json({messae: 'Product not found'})
      cart.products.push(productId);
      cart.save();
      res.json({message: 'Product added succesfully'})
    } catch (error) {
      console.log(error);
    }
  }

  export async function purchase(cartId, email) {
    try {
      const cart = await cartsManager.getCartById(cartId);
      if (!cart) return res.json({messae: 'Cart not found'})
      if(!product || product.stock === 0) return res.json({messae: 'Product not found or with no stock'})
      const product = productsManager.getProductById(product._id)
      product.stock--
      product.save()
      const ticket = ticketsManager.createTicket(10000, email)
      res.json({message: 'Your purchase has succesfully been submited'})
    } catch (error) {
      console.log(error);
    }
  }