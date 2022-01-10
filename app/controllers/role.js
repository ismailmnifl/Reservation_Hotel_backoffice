const Role = require('../models/role');

module.exports = {
    getAllRoles: async(req, res, next) => {
        try {
            const results = await Role.find({});
            res.status(200).json(results);

        } catch (error) {

            next(error);
        }
    },
    newRole: async(req, res, next) => {
        try {
            const newRole = new Role(req.body);
            const role = await newRole.save();

            res.status(201).json(role);
        } catch (error) {

            next(error);
        }
    },
    deleteRole: async(req, res, next) => {
        try {
            const { roleId } = req.params;
            const deletedRole = await Role.findByIdAndDelete(roleId);
            res.status(200).json({
                message: "role deleted succesfully !"
            })
        } catch (error) {

            next(error);
        }
    }
}