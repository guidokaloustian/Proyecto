import { Router } from "express";
import { ProductManager } from "../productManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await productManager.getProducts(limit);
      res.json({ products });
    } catch (error) {
      res.send(error);
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
  
  router.post("/", async (req, res)=> {
      try{
          const {title, description, category, price, thumbnails, code, stock, status} = req.body;
          const product = await productManager.addProduct(title, description, category, price, thumbnails, code, stock, status);
          if(product) {
          res.status(201).json({message: 'User created successfully', product})
          } else {
              res.status(400).json({message: 'Failed to create user'})
          }
      } catch (error) {
          res.send(error)
      }
  })
  
  router.put("/:productId", async (req, res)=> {
    try {
        const {productId} = req.params;
        const obj = req.body;
        if(obj.hasOwnProperty("id")) {
            throw new Error('Product ID cannot be modified.')
        }  
        const newProduct = await productManager.updateProduct(parseInt(productId), obj)
        res.status(200).json({message:'User updated successfully', newProduct})
    } catch(error) {
        res.send(error.message);
    }
  })
  
  router.delete("/:productId", async (req, res)=> {
      const {productId} = req.params;
      const product = await productManager.deleteById(parseInt(productId));
      res.json({message: 'User deleted successfully'}, product)
  })

export default router;