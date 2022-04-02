// Models
const { Users } = require('../models/user.model');
const { Products } = require('../models/products.model');
const { Carts } = require('../models/carts.model');
const { productsInCart } = require('../models/productsInCart.model');
const { Orders } = require('../models/orders.model');

const initModels = () => {
    // 1 User <--> M Product
    Users.hasMany(Products);
    Products.belongsTo(Users);

    // 1 User <--> M Order
    Users.hasMany(Orders);
    Orders.belongsTo(Users);

    // 1 User <--> 1 Cart
    Users.hasOne(Carts);
    Carts.belongsTo(Users);

    // M Cart <--> M Product
    Carts.belongsToMany(Products, { through: productsInCart });
    Products.belongsToMany(Carts, { through: productsInCart });

    // 1 Order <--> 1 Cart
    Carts.hasOne(Orders);
    Orders.belongsTo(Carts);
};

module.exports = { initModels };