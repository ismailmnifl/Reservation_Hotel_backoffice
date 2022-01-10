const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const usersControllers = require('../app/controllers/users');

const adminMiddleware = require('../middlewares/isAdmin');
const customerMiddleware = require('../middlewares/isCustomer');

router.route('/')
    .get(adminMiddleware.isAdmin, usersControllers.index);
//   /users/:roleId
router.route('/:roleId')
    .post(usersControllers.newUser);
// /users/:userId

router.route('/:userId')
    .get(usersControllers.getUser)
    .put(usersControllers.replaceUser)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.daleteUser);

// /users/:id/reservations

router.route('/:userId/reservations')
    .get(usersControllers.getUserReservations)
    .post(usersControllers.newUserReservation);
module.exports = router;