const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recommend = new Schema({
    username : {
        type: String,
        required : true
    },
    message : {
        type: String,
        required: true
    }
});

const Recommends = mongoose.model('Recommends', Recommend);

module.exports = Recommends;