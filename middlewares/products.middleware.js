// Models
const { Products } = require('../models/products.model');
const { Users } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.productExists = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const product = await Products.findOne({
        where: { status: 'active', id },
        include: [{ model: Users, attributes: { exclude: ['password'] } }]
    });

    if (!product) {
        return next(new AppError(404, 'No product found'));
    }

    req.product = product;

    next();
});

exports.productOwner = catchAsync(async(req, res, next) => {
    // Get current session user's id
    const { currentUser, product } = req;

    // Compare product's userId
    if (product.userId !== currentUser.id) {
        return next(new AppError(403, 'You are not the owner of this product'));
    }

    next();
});