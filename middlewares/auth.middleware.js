const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const { promisify } = require('util');

// Models
const { Users } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');


exports.validateSession = catchAsync(
    async(req, res, next) => {
        // Extract token from headers
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            // Bearer token123.split(' ') -> [Bearer, token123]
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError(401, 'Invalid session'));
        }

        // Verify that token is still valid
        const decodedToken = await promisify(jwt.verify)(
            token,
            config.JWTsecret
        );

        // Validate that the id the token contains belongs to a valid user
        // SELECT id, email FROM users;
        const user = await Users.findOne({
            where: { id: decodedToken.id, status: 'active' },
            attributes: {
                exclude: ['password']
            }
        });

        if (!user) {
            return next(new AppError(401, 'Invalid session'));
        }

        req.currentUser = user;

        // Grant access
        next();
    }
);

exports.protectAdmin = catchAsync(async(req, res, next) => {
    if (req.currentUser.role !== 'admin') {
        return next(new AppError(403, 'Access denied'));
    }

    // Grant access
    next();
});