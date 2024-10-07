var express = require('express');
var router = express.Router();

const db =require('../models')

const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

const cartService = new CartService(db.Cart);
const cartController = new CartController(cartService);

router.post('/newcart', async (req,res)=>{
    await cartController.createCart(req,res);
  });
  
router.get('/allitems', async(req,res)=>{
    await cartController.listAllItems(req,res);
  });

router.put('/add/:id', async (req,res)=>{
    await cartController.addItem(req,res);
  });

router.put('/remove/:id', async (req, res)=>{
    await cartController.deleteItem(req,res);
});

module.exports = router;
