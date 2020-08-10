const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Program = new Schema({
    nom : String,
    jour : String,
    heureDepart : String,
    trajet : String,
    Prix : Number
});

const Programs = mongoose.model('Programs', Program);

module.exports = Programs