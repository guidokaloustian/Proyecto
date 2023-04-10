import { getAllProducts, getProductById, createProduct } from "../services/products.services.js";

export async function create(req, res) {
    const { title, description, category, price, thumbnails, code, stock, status } = req.body;
    if (!title || !description || !category || !price || !thumbnails || !code || !stock || !status) {
      res.status(400).json({ error: "Field missing" });
    }
    try {
      const newProduct = await createProduct(req.body);
      res.status(200).json({ message: "Product created", newProduct });
    } catch (error) {
      res.status(500).json(error);
    }
  }


export async function findById(req, res) {
    try {
      const { _id } = req.body;
      const product = await getProductById({ _id });
      if (product.length === 0) {
        res.status(200).json({ message: "Product incorrect" });
      } else {
        res.status(200).json({ message: "Product found", user });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  export async function findAll (req, res) {
    try {
      const products = await getAllProducts();
      if (products.length === 0) {
        res.status(200).json({ message: "No products" });
      } else {
        res.status(200).json({ message: "Products found", user });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }