import fs from "fs";
import { ProductManager } from "./productManager.js";

export class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./JSON/carts.json";
    this.productManager = new ProductManager();
  }

  async createCart() {
    if (fs.existsSync(this.path)) {
    const fileInfo = await fs.promises.readFile(this.path, 'utf-8');
    this.carts = JSON.parse(fileInfo);
    }
    const cart = {
      id:
      this.carts.length === 0
      ? 1
      : this.carts[this.carts.length - 1].id + 1,
      products: [],
    };
    this.carts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    return cart;
  }

  async getCart(cartId) {
    try {
      if (fs.existsSync(this.path)) {
        const infoCartJson = await fs.promises.readFile(this.path, "utf-8");
        const cart = JSON.parse(infoCartJson).find(
          (cart) => cart.id === parseInt(cartId)
        );
        return cart;
      } else {
        console.log('Cart does not exist.');
      }
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      if (fs.existsSync(this.path)) {
        const cartsFileInfo = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(cartsFileInfo);
        const product = await this.productManager.getById(productId);
        const cartIndex = this.carts.findIndex(c => c.id === parseInt(cartId));
        if (!product || cartIndex === -1) {
          throw new Error("Product/Cart does not exist");
        }
        const productIndex = this.carts[cartIndex].products.findIndex(
          (p) => p.product === parseInt(productId)
        );
        console.log(this.carts[cartIndex].products);
        if (productIndex === -1) {
          this.carts[cartIndex].products.push({
            product: parseInt(productId),
            quantity: 1,
          });
        } else {
          this.carts[cartIndex].products[productIndex].quantity++;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts))

        return this.carts[cartIndex];
      }
    } catch (error) {
      return error;
    }
  }

  #idExists(id, array) {
    return array.find((item) => item.id === id);
  }
}
