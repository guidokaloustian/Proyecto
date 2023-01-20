import fs from "fs";

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./JSON/products.json";
  }

  async addProduct(
    title,
    description,
    category,
    price,
    thumbnails,
    code,
    stock,
    status = true
  ) {
    if (!title || !description || !category || !price || !code || !stock) {
      console.log("You need to complete all fields.");
    } else {
      this.products = await this.getProducts();
      const product = {
        id:
          this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1,
        title,
        description,
        category,
        price,
        thumbnails,
        code,
        stock,
        status,
      };
      if (this.#validateCode(code) === undefined) {
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return product;
      } else {
        console.error(`Already exists a product with code "${code}".`);
      }
    }
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const infoProductJson = await fs.promises.readFile(this.path, "utf-8");
        if (limit) {
          return JSON.parse(infoProductJson).slice(0, limit);
        } else {
          return JSON.parse(infoProductJson);
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      if (fs.existsSync(this.path)) {
        const fileInfo = await this.getProducts();
        const product = fileInfo.find((item) => item.id === parseInt(id));
        return product;
      } else {
        console.error("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      if (fs.existsSync(this.path)) {
        let infoProducts = await this.getProducts();
        let found = this.#idExists(id, infoProducts);
        let fileUpdated = infoProducts.map((item) =>
          item === found ? { ...item, ...obj, id } : item
        );

        found = await this.#idExists(id, fileUpdated);
        infoProducts = JSON.stringify(fileUpdated);
        await fs.promises.writeFile(this.path, infoProducts);
        return found;        
      }
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      if (fs.existsSync(this.path)) {
        const infoFileJson = await fs.promises.readFile(this.path, "utf-8");
        const infoFile = JSON.parse(infoFileJson);
        let infoDeleted = infoFile.filter((item) => item.id !== id);
        const infoDeletedJson = JSON.stringify(infoDeleted);
        await fs.promises.writeFile(this.path, infoDeletedJson);
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  #idExists(id, array) {
    return array.find((item) => item.id === id);
  }

  #validateCode(code) {
    let found = this.products.find((item) => item.code === code);
    return found;
  }
}

const productManager = new ProductManager();

let prueba = async () => {
  await productManager.addProduct(
    "Parrilla Anafe + Plancheta",
    "Anafe de acero aluminio",
    45000,
    "./image/image1",
    1234,
    10
  );

  await productManager.addProduct(
    "Parrilla Gaucha",
    "Parrilla de 100x50 cm",
    80000,
    "./image/image2",
    1235,
    5
  );

  await productManager.addProduct(
    "Parrilla Anafe + Plancheta",
    "Anafe de acero aluminio",
    50000,
    "./image/image1",
    1236,
    1
  );

  await productManager.addProduct(
    "Parrilla nueva",
    "Parrilla 1m x 1m",
    100000,
    "./image/image1",
    1237,
    25
  );
};
