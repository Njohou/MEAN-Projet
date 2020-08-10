const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const Covoiturage = new Schema({
    username : {
        type: String , 
        required:true 
                },
    immatriculation : {
        type: String,
        required: true
    },
    placedispo : {
        type : Number,
        required : true
    },
    dateDepart : {
        type: Date,
        required: true
    },
    posteDate : {
        type:Date,
        required: true
    },
    destination : {
        type:String,
        required:true
    },
    chauffeur : {
        type:String,
        required:true
    }
});


const CoVoiturages = mongoose.model('Vehicules', Covoiturage);

// Create new profil
CoVoiturages.createProfil = (covoiture, callback)=>{
    User.findOne({ username : covoiture.username }, (err, user)=>{
        if(err){
            callback(null, 'Erreur serveur');
            console.log(err);
        }else if(!user){
            callback(null, 'Username not exist !!');
        }else if(user){
            covoiture.save((err, result)=>{
                if(err){
                    console.log('Erreur d\' enregistrement :' +err);
                    return callback('Erreur d\' enregistrement', null);
                }else{
                    //console.log(user);
                    callback(null, 'Enregistrement complet');
                }
            });
        }
    });

}

module.exports = CoVoiturages