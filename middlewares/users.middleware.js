// Models
const { Users } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.userExists = catchAsync(async(req, res, next) => {
    const { id } = req.params;

    const user = await Users.findOne({
        attributes: { exclude: ['password'] },
        where: { id, status: 'active' }
    });

    if (!user) {
        return next(new AppError(404, 'User not found with given id'));
    }

    req.user = user;
    next();
});

exports.protectUserAccount = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const { currentUser } = req;

    if (+id !== currentUser.id) {
        return next(new AppError(403, 'You do not own this account'));
    }

    next();
});