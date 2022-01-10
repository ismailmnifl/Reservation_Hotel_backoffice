const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
    login: async(req, res, next) => {
        try {
            const {
                email,
                password
            } = req.body;

            const result = await User.findOne({ email: email, password: password }).populate('role');
            if (result != null) {

                delete req.session.userId;
                delete req.session.role;

                req.session.userId = result._id;
                req.session.role = result.role.description;
                res.status(200).json(result);
            } else {
                res.status(403).json({
                    message: "login credentials are false !"
                });

            }


        } catch (error) {
            next(error);
        }
    },
    logout: (req, res, next) => {

        try {
            if (req.session.role) {

                delete req.session.role;

                res.status(200).json({
                    message: 'your are logged Out !'
                })
                res.end();
            } else {
                res.status(200).json({
                    message: 'your are already logged Out !'
                })
            }
        } catch (error) {

            next(error);
        }

    }
}