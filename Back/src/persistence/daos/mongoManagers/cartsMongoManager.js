import { cartsModel } from "../../models/carts.model.js";

export default class CartsMongoManager {
  async createCart(objCart) {
    try {
      const newCart = await cartsModel.create(objCart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const cart = await cartsModel.find();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(idCart) {
    try {
      const cart = await cartsModel.findById(idCart).populate("products");
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(cartId, newArray) {
    try {
        const updatedCart = await cartsModel.findByIdAndUpdate(cartId, newArray, {new: true})
        return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProuctsFromCart(cartId) {
    try {
      const cart = await cartsModel.findById(cartId);
      cart.products.remove({});
      cart.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId);
      cart.products.remove(productId);
      cart.save();
    } catch (error) {
      console.log(error);
    }
  }
}
