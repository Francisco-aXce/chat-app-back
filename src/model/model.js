const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
});

const Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;