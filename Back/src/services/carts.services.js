import CartsMongoManager from "../DAL/daos/mongoManagers/cartsMongoManager.js";

const cartsManager = new CartsMongoManager()

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