const User = require('../models/user');
const Reservation = require('../models/reservation');
const Role = require('../models/role');

module.exports = {
    //get all users from the database 
    index: async(req, res, next) => {

        try {

            const users = await User.find({});
            res.status(200).json(users);

        } catch (error) {

            next(error);
        }


    },
    //insert new user into the database
    newUser: async(req, res, next) => {
        try {
            //getting the user role index
            const { roleId } = req.params;
            //creating new user from the requenst body data
            const newUser = new User(req.body);
            //getting the role object using the role index (roleId)
            const role = await Role.findById(roleId);
            //adding the the role to the user object
            newUser.role = role;
            //sazving the user in the databse
            await newUser.save();
            //adding the user data the the users array in the role object 
            role.users.push(newUser);
            // saving the role object on the database 
            await role.save();
            //sending the responce with a status of 201 (something was saved)
            res.status(201).json(newUser);
        } catch (error) {

            next(error);
        }

    },

    //get single user by his index
    getUser: async(req, res, next) => {

        try {

            const { userId } = req.params;
            const user = await User.findById(userId);
            res.status(200).json(user);

        } catch (error) {

            next(error);
        }
    },
    //replace all user data 
    replaceUser: async(req, res, next) => {
        try {

            const { userId } = req.params;
            const newUser = req.body;
            const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
            res.status(200).json(result);

        } catch (error) {
            next(error);
        }

    },
    //update some user data 
    updateUser: async(req, res, next) => {

        try {

            const { userId } = req.params;
            const newUser = req.body;
            const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
            res.status(200).json(result);

        } catch (error) {
            next(error);
        }

    },
    //delete user by his index
    daleteUser: async(req, res, next) => {
        try {

            const { userId } = req.params;
            const result = await User.findByIdAndDelete(userId);
            res.status(200).json({
                message: "deleted succefully"
            });

        } catch (error) {
            next(error);
        }
    },
    //get all user resevations by his index
    getUserReservations: async(req, res, next) => {
        try {

            const { userId } = req.params;
            const userReservations = await User.findById(userId).populate('resetvations');
            console.log('user reservations', userReservations.resetvations);
            res.status(200).json(userReservations.resetvations);

        } catch (error) {
            next(error);
        }
    },
    //insert new user resrvattions
    newUserReservation: async(req, res, next) => {

        try {

            const { userId } = req.params;
            //create new resetvation
            const newResedrvation = new Reservation(req.body);
            //get user
            const user = await User.findById(userId);
            //assign user as hotel customer
            newResedrvation.customer = user;
            await newResedrvation.save();

            //add reservation to the user reservation array
            user.resetvations.push(newResedrvation);
            //save the user
            await user.save();
            res.status(201).json(newResedrvation);

        } catch (error) {

            next(error);
        }
    }
};