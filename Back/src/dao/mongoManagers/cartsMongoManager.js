import { cartsModel } from "../models/carts.model.js";
import logger from '../../utils/logs/winston.js'


export default class CartsMongoManager {
  async createCart(objCart) {
    try {
      const newCart = await cartsModel.create(objCart);
      return newCart;
    } catch (error) {
      return error
    }
  }

  async getAll() {
    try {
      const cart = await cartsModel.find();
      return cart;
    } catch (error) {
      return error
    }
  }

  async getCartById(idCart) {
    try {
      const cart = await cartsModel.findById(idCart).populate("products");
      return cart;
    } catch (error) {
      return error
    }
  }

  async updateCart(cartId, newArray) {
    try {
        const updatedCart = await cartsModel.findByIdAndUpdate(cartId, newArray, {new: true})
        return updatedCart;
    } catch (error) {
      return error
    }
  }

  async deleteAllProuctsFromCart(cartId) {
    try {
      const cart = await cartsModel.findById(cartId);
      await cart.products.remove({});
      await cart.save();
      return cart
    } catch (error) {
      return error
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId);
      cart.products.remove(productId);
      cart.save();
    } catch (error) {
      return error
    }
  }
}
