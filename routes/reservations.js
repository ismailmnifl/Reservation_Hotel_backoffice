const express = require('express');
const router = express.Router();

const reservationController = require('../app/controllers/reservations');
router.route('/')
    .get(reservationController.getAllReservations);

router.route('/:reservationId')
    .get(reservationController.getSingle)
    .delete(reservationController.deleteReservations)
    .patch(reservationController.updateReservations);
module.exports = router;