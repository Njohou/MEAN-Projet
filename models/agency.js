const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Programs = new Schema({
    jour : String,
    trajet : String,
    heureDepart : String,
    heureArrivee : String,
    plaqueImm : String,
    nomChauffeur : String,
    Prix : Number,
    placedispo : Number
});

const Agency = new Schema({
    code : {
        type: Number, 
        required:true,
        unique:true 
    },
    nom : {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type : String,
        required : true,
    },
    programs : [Programs]
});


const Agencies = mongoose.model('Agencies', Agency);

module.exports = Agencies
