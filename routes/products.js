var express = require('express');
var router = express.Router();

const db =require('../models')

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

router.post('/newproduct', async (req,res)=>{
    await productController.createProduct(req,res);
  });
  
router.get('/all', async(req,res)=>{
    await productController.findAllProducts(req,res);
  });

router.put('/all/:id', async (req,res)=>{
    await productController.updateProduct(req,res);
  });

router.delete('/all/:id', async(req,res)=>{
    await productController.deleteProduct(req,res);
  });

module.exports = router;