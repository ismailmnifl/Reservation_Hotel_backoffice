const Pension = require('../models/pension');

module.exports = {
    getAllPensions: async(req, res, next) => {
        try {
            const results = await Pension.find({});
            res.status(200).json(results);

        } catch (error) {

            next(error);
        }

    },
    newPension: async(req, res, next) => {
        try {
            const newPension = new Pension(req.body);
            await newPension.save();
            res.status(201).json(newPension);
        } catch (error) {

            next(error);
        }

    },
    deletePension: async(req, res, next) => {
        try {
            const { pensionId } = req.params;
            await Pension.findByIdAndDelete(pensionId);
            res.status(200).json({
                message: 'the pension way deleted succesfully !'
            })
        } catch (error) {
            next(error);
        }


    },
    updatePension: async(req, res, next) => {
        try {

            const { pensionId } = req.params;
            const newPension = req.body;
            const pension = await Pension.findByIdAndUpdate(pensionId, newPension, { new: true });
            res.status(201).json(pension);

        } catch (error) {
            next(error);
        }
    }

}