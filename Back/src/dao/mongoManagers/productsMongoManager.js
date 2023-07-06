import { productsModel } from '../models/products.model.js';

export default class ProductsMongoManager {
  async getAll() {
    try {
      const products = await productsModel.find()
      return products;
    } catch (error) {
      return error
    }
  }

  async getProductById(productId) {
    try {
      return await productsModel.findById(productId);
    } catch (error) {
      return error
    }
  }

  async createProduct(objProduct) {
    try {
      const newProd = await productsModel.create(objProduct);
      return newProd;
    } catch (error) {
      return error
    }
  }
}
