const Reservation = require('../models/reservation');
module.exports = {
    getAllReservations: async(req, res, next) => {
        try {
            const results = await Reservation.find({});
            res.status(200).json(results);
        } catch (error) {

            next(error);
        }
    },
    getSingle: async(req, res, next) => {
        try {
            const { reservationId } = req.params;
            console.log(reservationId);

            const reservation = await Reservation.findById(reservationId);
            res.status(200).json(reservation);
        } catch (error) {

            next(error);
        }
    },
    deleteReservations: async(req, res, next) => {
        try {
            const { reservationId } = req.params;
            await Reservation.findByIdAndDelete(reservationId);
            res.status(200).json({
                message: 'the reservation data was deleted successfully!'
            });
        } catch (error) {

            next(error);
        }
    },
    updateReservations: async(req, res, next) => {
        try {
            const { reservationId } = req.params;
            const modifiedResesrvation = req.body;
            const reservation = await Reservation.findByIdAndUpdate(reservationId, modifiedResesrvation, { new: true });
            res.status(201).json(reservation);

        } catch (error) {

            next(error);
        }
    }
}