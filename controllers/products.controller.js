// Models
const { Products } = require('../models/products.model');
const { Users } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { filterObj } = require('../utils/filterObj');

exports.createProduct = catchAsync(async(req, res, next) => {
    const { title, description, quantity, price } = req.body;
    const { id } = req.currentUser;

    const newProduct = await Products.create({
        title,
        description,
        quantity,
        price,
        userId: id
    });

    res.status(201).json({
        status: 'success',
        data: { newProduct }
    });
});

exports.getAllProducts = catchAsync(async(req, res, next) => {
    const products = await Products.findAll({
        where: { status: 'active' },
        include: [{ model: Users, attributes: { exclude: ['password'] } }]
    });

    res.status(200).json({
        status: 'success',
        data: { products }
    });
});

exports.getProductById = catchAsync(async(req, res, next) => {
    const { product } = req;

    res.status(200).json({
        status: 'success',
        data: { product }
    });
});


exports.updateProduct = catchAsync(async(req, res, next) => {
    const { product } = req;

    const data = filterObj(req.body, 'title', 'description', 'quantity', 'price');

    await product.update({...data });

    res.status(204).json({ status: 'success' });
});

exports.disableProduct = catchAsync(async(req, res, next) => {
    const { product } = req;

    await product.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});