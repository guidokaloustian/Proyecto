import { Router } from "express";
//import { ProductManager } from "../productManager.js";
import ProductManager from "../persistence/daos/mongoManagers/productsMongoManager.js";

const router = Router();
const productManager = new ProductManager();

const products = [
  {
    title: "Parrilla de acero inoxidable",
    description: "Parrilla 150cm x 100cm",
    category: "Parrilla",
    price: 100000,
    thumbnails: "./image/imagenueva",
    code: "2222",
    stock: 10,
    status: true,
  },
  {
    title: "Asador con fogonero incluido",
    description: "Parrilla 200cm x 100cm con fogonero incluido",
    category: "Parrilla",
    price: 150000,
    thumbnails: "./image/imagenueva",
    code: "1111",
    stock: 100,
    status: true,
  },
  {
    title: "Accesorios para el asador",
    description:
      "Juego de accesorios para el asador (incluye palita, pinza y tenedor)",
    category: "Accesorios",
    price: 12000,
    code: "113311",
    stock: 100,
    status: true,
  },
];

router.get("/create", async (req, res) => {
    await productManager.createProduct(products);
    res.json({message: 'Users created'})
});

router.get("/", async (req, res) => {
  try {
    const {limit=10, page=1, category, order} = req.query;
    const products = await productManager.getAll(limit, page, category, order);
    
    if (products.length !== 0) {
      res.json({status:'success', payload:products.docs, totalPages:products.totalPages, prevPage:products.prevPage,
    nextPage:products.nextPage, page:products.page, hasPrevPage:products.hasPrevPage, hasNextPage:products.hasNextPage,
    prevLink: products.hasPrevPage === false ? 'null' :'http://localhost:8080/api/products/?page=' + products.prevPage,
    nextLink: products.hasNextPage === false ? 'null' :'http://localhost:8080/api/products/?page=' + products.nextPage});
    } else {
      res.send("Aún no existen productos");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:productId", async (req, res) => {
  try {
    let { productId } = req.params;
    const product = await productManager.getById(productId);
    if (product) {
      res.status(200).json({ message: "User found successfully", product });
    } else {
      res.status(400).json({ error: "There is no user with that ID." });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      thumbnails,
      code,
      stock,
      status,
    } = req.body;
    const product = await productManager.addProduct(
      title,
      description,
      category,
      price,
      thumbnails,
      code,
      stock,
      status
    );
    if (product) {
      res.status(201).json({ message: "User created successfully", product });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const obj = req.body;
    if (obj.hasOwnProperty("id")) {
      throw new Error("Product ID cannot be modified.");
    }
    const newProduct = await productManager.updateProduct(
      parseInt(productId),
      obj
    );
    res.status(200).json({ message: "User updated successfully", newProduct });
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await productManager.deleteById(parseInt(productId));
  res.json({ message: "User deleted successfully" }, product);
});

export default router;
