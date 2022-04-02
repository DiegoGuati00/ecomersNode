const express = require('express');

// Controllers
const {
    getAllOrder,
    getAllOrderById,
    createNewUser,
    updateUser,
    deleteUser,
    userLogin,
    getAllProductsUser
} = require('../controllers/user.controller');

// Middlewares
const { validateSession } = require('../middlewares/auth.middleware');
const {
    userExists,
    protectUserAccount
} = require('../middlewares/users.middleware');

const router = express.Router();

router.post('/', createNewUser);

router.post('/login', userLogin);

router.use(validateSession);

router.get('/orders', getAllOrder);

router.get('/orders/:id', getAllOrderById);

router.get('/me', getAllProductsUser);

router
    .use('/:id', userExists)
    .route('/:id')
    .patch(protectUserAccount, updateUser)
    .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter: router };