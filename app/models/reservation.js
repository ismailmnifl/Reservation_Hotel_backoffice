const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    dateCheckIn: Date,
    dateCheckOut: Date,
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    accomodation: {
        type: Schema.Types.ObjectId,
        ref: 'accomodation'
    },
    pension: {
        type: Schema.Types.ObjectId,
        ref: 'pension'
    }
});

const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;