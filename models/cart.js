const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users', 
                key: 'id' 
            },
            allowNull: false
        },
        items: [{
            type: Sequelize.JSON,
            allowNull: true
        }]
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: 'userID',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE'  
        });
    };

    return Cart;
};
