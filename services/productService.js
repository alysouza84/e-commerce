const auth = require('../auth');
const db = require('../models');

class ProductService{
    constructor(ProductModel){
        this.Product = ProductModel;
    }

    async create(name, desc, price, stock){
        try{
            const newProduct = await this.Product.create({
                name:name,
                desc:desc,
                price:price,
                stock:stock
            });
            return newProduct ? newProduct : null;
            
        }
        catch (error){
            throw error;
        }
    }

    async update(id, name, desc, price, stock) {
        try {
            const [updatedRowCount] = await this.Product.update(
                { name, desc, price, stock }, 
                {where: { id }}
            );
    
            if (updatedRowCount === 0) {
                return null; 
            }
    
            const updatedProduct = await this.Product.findByPk(id);
            return updatedProduct;
        } 
        catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const product = await this.Product.findByPk(id);
            
            if (!product) {
                return null; 
            }

            await this.Product.destroy({ where: { id } });
            return product; 

        } 
        catch (error){
            throw error; 
        }
    }

    async findAll()
    {
        try{
            const AllProducts = await this.Product.findAll();
            return AllProducts ? AllProducts : null;
        }
        catch(error){
            throw error;
        }

    }
}

module.exports = ProductService;