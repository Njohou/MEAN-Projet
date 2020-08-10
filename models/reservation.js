const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReserveCarpooling = new Schema({
    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    provider : {
        type: String,
        required : true
    }
});

const ReserveCarpoolings = mongoose.model('ReserveCarpooling', ReserveCarpooling);

module.exports = ReserveCarpoolings;