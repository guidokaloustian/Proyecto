import { getAllProducts, getProductById, createProduct } from "../services/products.services.js";
import { productsModel } from "../dao/models/products.model.js";

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
      const product = await getProductById(req.params.productId);
      if (product.length === 0) {
        res.status(200).json({ message: "Product incorrect" });
      } else {
        res.status(200).json({ message: "Product found", product });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  export async function findAll (req, res) {
    try {
      const {limit=10, page=1, category, order = 1} = req.query;
      let productsDocs = await getAllProducts();
      productsDocs = await productsModel.aggregate([
        { $sort: { price: order } },
      ]);
      const products = await productsModel.paginate({category}, { limit, page });
      console.log(productsDocs);
      if (products.length === 0) {
        res.status(200).json({ message: "No products" });
      } else {
        res.json({status:'success',
        payload:productsDocs,
        totalPages:products.totalPages,
        prevPage:products.prevPage,
        nextPage:products.nextPage,
        page:products.page,
        hasPrevPage:products.hasPrevPage,
        hasNextPage:products.hasNextPage,
        prevLink: products.hasPrevPage === false ? 'null' :'http://localhost:8080/api/products/?page=' + products.prevPage,
        nextLink: products.hasNextPage === false ? 'null' :'http://localhost:8080/api/products/?page=' + products.nextPage});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }