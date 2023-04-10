import ProductsMongoManager from "../DAL/daos/mongoManagers/productsMongoManager.js";

const productManager = new ProductsMongoManager()

export async function getAllProducts() {
    try {
        const products = productManager.getAll()
        return products
    } catch (error) {
        return error;
    }
}

export async function getProductById(productId) {
    try {
        const product = productManager.getProductById(productId)
        return product
    } catch (error) {
        return error;
    }
}

export async function createProduct(objProduct) {
    try {
        const productCreated = productManager.createProduct(objProduct)
        return productCreated
    } catch (error) {
        return error;
    }
}