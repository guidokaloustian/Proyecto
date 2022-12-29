const fs = require("fs");

class ProductManager {
  static #id = 0;

  constructor() {
    this.products = [];
    this.path = "./JSON/products.json";
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Debe completar todos los campos");
    } else {
      const product = {
        id: this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      if (this.#validateCode(code) === undefined) {
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.error(`Ya existe un producto con el code "${code}".`);
      }
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoProductJson = await fs.promises.readFile(this.path, "utf-8");
        const infoProduct = JSON.parse(infoProductJson);
        return infoProduct;
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
        const fileInfoJson = await fs.promises.readFile(this.path, "utf-8");
        const fileInfo = JSON.parse(fileInfoJson);
        return fileInfo.find((item) => item.id === id);
      } else {
        console.error("Not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
    try {
      if (fs.existsSync(this.path)) {
        let infoProducts = await fs.promises.readFile(this.path, "utf-8");
        infoProducts = JSON.parse(infoProducts);
        let found = this.#idExists(id, infoProducts);
        let fileUpdated = infoProducts.map((item) =>
          item === found
            ? {
                id,
                title: newTitle,
                description: newDescription,
                price: newPrice,
                thumbnail: newThumbnail,
                code: newCode,
                stock: newStock,
              }
            : item
        );

        infoProducts = JSON.stringify(fileUpdated);
        await fs.promises.writeFile(this.path, infoProducts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      if(fs.existsSync(this.path)) {
      const infoFileJson = await fs.promises.readFile(this.path, "utf-8");
      const infoFile = JSON.parse(infoFileJson);
      let infoDeleted = infoFile.filter((item) => item.id !== id);
      const infoDeletedJson = JSON.stringify(infoDeleted);
      await fs.promises.writeFile(this.path, infoDeletedJson);
      }
    } catch (error) {
      console.log(error);
    }
  }

  #idExists(id, array) {
    return array.find((item) => item.id === id);
  }

  #generarId() {
    ProductManager.#id++;
    return ProductManager.#id;
  }

  #validateCode(code) {
    let found = this.products.find(item => item.code === code);
    return found;
  }
}

const productManager = new ProductManager();

prueba = async () => {
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
    1
  );

  let found = await productManager.getById(2);

  console.log(found);

  let update = await productManager.updateProduct(
    2,
    "Nueva parrilla",
    null,
    9999999,
    null,
    123,
    100
  );

  await productManager.deleteById(3);

  const show = await productManager.getProducts();

  console.log(show);
};

prueba();


