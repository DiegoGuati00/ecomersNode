const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//models
const { Users } = require('../models/user.model');
const { Products } = require('../models/products.model');

// Utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { config } = require('../config/config');

exports.createNewUser = catchAsync(async(req, res, next) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return next(
            new AppError(400, 'Must provide a valid name, email and password')
        );
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'guest'
    });

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        data: { newUser }
    });
});

exports.userLogin = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    // Find user given an email and has status active
    const user = await Users.findOne({
        where: { email, status: 'active' }
    });

    // Compare entered password vs hashed password
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError(400, 'Credentials are invalid'));
    }

    // Create JWT
    const token = await jwt.sign({ id: user.id }, // Token payload
        config.JWTsecret, // Secret key
        {
            expiresIn: config.JWTexpire
        }
    );

    res.status(200).json({
        status: 'success',
        data: { token }
    });
});

exports.getAllProductsUser = catchAsync(async(req, res, next) => {
    const { id } = req.currentUser;

    const products = await Products.findAll({
        where: { userId: id }
    });

    res.status(200).json({
        status: 'success',
        data: { products }
    });

});

exports.updateUser = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const data = filterObj(req.body, 'username', 'email', 'password');

    const user = await Users.findOne({
        where: { id: id, status: 'active' }
    });

    if (!user) {
        return next(
            new AppError(404, 'Can\'t update post, maybe invalid ID')
        );
    }

    await user.update({...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
});

exports.deleteUser = catchAsync(async(req, res, next) => {
    const { user } = req;

    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

exports.getAllOrder = catchAsync(async(req, res, next) => {});

exports.getAllOrderById = catchAsync(async(req, res, next) => {});