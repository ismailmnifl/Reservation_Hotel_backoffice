const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    adresse: String,
    resetvations: [{
        type: Schema.Types.ObjectId,
        ref: 'reservation'
    }],
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;