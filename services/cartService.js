const auth = require('../auth');
const db = require('../models');
const user = require('../models/user');

class CartService{
    constructor(CartModel){
        this.Cart = CartModel;
    }

    async create(userID, item){
        try{
            const newCart = await this.Cart.create({
                userID:userID,
                item:item
            });
            return newCart ? newCart : null;
            
        }
        catch (error){
            throw error;
        }
    }

    async addItem(userID, item) {
        try{

            if (await listCartItems(userID) == null){ 
                const Cart = await create(userID, item);
                return Cart ? Cart : null;
            }
            else{
                const Cart = await this.Cart.create({
                    id:id,
                    userID:userID,
                    items:items
                });
            }

            return newCart ? newCart : null;
            
        }
        catch (error){
            throw error;
        }





        try {
            const cart = await this.Cart.findOne({
                where: { userID: userID }
            });

            if (cart) {
                cart.items.push(newItem); 
                await cart.save(); 
                return cart.items;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async removeItem(userID, itemToRemove) {
        try {
            const cart = await this.Cart.findOne({
                where: { userID: userID }
            });

            if (cart) {
                
                cart.items = cart.items.filter(item => item !== itemToRemove);
                await cart.save(); 
                return cart.items;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async listCartItems(userID) {
        try {
            const cart = await this.Cart.findOne({
                where: { userID: userID }
            });
            
            if (cart) {
                return cart.itens; 
            } else {
                return null; 
            }
        } catch (error) {
            throw error; 
        }
    }
    
}

module.exports = CartService;