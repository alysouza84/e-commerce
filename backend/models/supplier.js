const Sequelize = require('sequelize');

module.exports = (sequelize) =>{
    const Supplier = sequelize.define('Supplier',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        productType:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    
    return Supplier;
};