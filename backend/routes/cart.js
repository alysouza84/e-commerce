var express = require('express');
var router = express.Router();

const db =require('../models')

const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

const cartService = new CartService(db.Cart);
const cartController = new CartController(cartService);

//Acessar todos os itens do carrinho
router.get('/all', async(req,res)=>{
    await cartController.listAllItems(req,res);
});

//Adicionar um item ao carrinho
router.post('/add', async (req,res)=>{
    await cartController.addToCart(req,res);
});

//Remover um item do carrinho
router.delete('/remove/:itemID', async (req, res)=>{
    await cartController.removeFromCart(req,res);
});

module.exports = router;
