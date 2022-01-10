const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const roleController = require('../app/controllers/role');

const adminMiddleware = require('../middlewares/isAdmin');

router.route('/')
    .get(roleController.getAllRoles)
    .post(roleController.newRole);

router.route('/:roleId')
    .delete(roleController.deleteRole);

module.exports = router;