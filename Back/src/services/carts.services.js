import CartsMongoManager from "../DAL/DAOs/mongoManagers/cartsMongoManager.js";
import ProductsMongoManager from "../DAL/DAOs/mongoManagers/productsMongoManager.js";
import TicketsMongoManager from "../DAL/DAOs/mongoManagers/ticketsMongoManager.js";

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
      if (!cart) throw new Error({message: 'Cart not found'})
      const product = await productsManager.getProductById(cart.products[0])
      console.log(product);
      if(!product || product.stock === 0) throw new Error({message: 'Cart not found'})
      product.stock--
      product.save()
      const ticket = await ticketsManager.createTicket({amount:10000})
      console.log(ticket);
    } catch (error) {
      console.log(error);
    }
  }