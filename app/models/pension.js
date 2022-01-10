const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pensionSchema = new Schema({
    pensiontype: String,
    halfType: String,
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'reservation'
    }],
});

const Pension = mongoose.model('pension', pensionSchema);
module.exports = Pension;