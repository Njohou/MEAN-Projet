const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketBus = new Schema({
    username : {
        type : String,
        required : true
    },
    agence : {
        type : String,
        required : true
    },
    Trajet : {
        type :String,
        required : true
    },
    Heuredepart : {
        type :String,
        required : true},
    Jour : {
        type : String,
        required : true
    },
    Prix : {
        type : Number,
        required : true
    },
    Place : {
        type : Number,
        required : true
    },
    PrixTotal : {
        type : Number,
        required : true
    },
    ReturnDate : {
        type : Date
    }
});

const TicketBuses = mongoose.model('TicketBus', TicketBus);


TicketBuses.EnregistrerSendMail = (ticket, callback)=>{
    ticket.save((err, result)=>{
        if(err){
            console.log(err);
            return callback('Erreur serveur', null);
        }else{ 
            return callback(null, 'Paiement effectué !!'); // 'Register successfully !!'
        }
    });
}

module.exports = TicketBuses