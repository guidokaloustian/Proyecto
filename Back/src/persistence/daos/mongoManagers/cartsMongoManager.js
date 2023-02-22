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
            const carts = await cartsModel.find();
            return carts
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idCart) {
        try {
            const cart = await cartsModel.findById(idCart).populate('products')
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const deleted = await cartsModel.d
        } catch (error) {
            console.log(error);
        }
    }
}