const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Minus = new Schema({
    id : {
        type : String,
        required: true
    },
    code : {
        type : Number
    },
    reservePlace : {
        type : Number,
        required :true
    }
});

const MINUS = mongoose.model('Minus', Minus);

module.exports= MINUS;