import { productsModel } from "../../models/products.model.js";

export default class ProductsMongoManager {
  async getAll(limit, page, category, order = 1) {
    try {
      let products = await productsModel.aggregate([
        { $sort: { price: order } },
      ]);
      products = await productsModel.paginate({category}, { limit, page });
      return await products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId) {
    try {
      return await productsModel.findById(productId);
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(objProduct) {
    try {
      const newProd = await productsModel.create(objProduct);
      return newProd;
    } catch (error) {
      console.log(error);
    }
  }
}
