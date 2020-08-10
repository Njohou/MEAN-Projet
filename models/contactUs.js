const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contact = new Schema({
    username : {
        type : String,
        required : true
    },
    post : {
        type : String,
        required : true
    },
    datePost : {
        type: Date,
        required : true
    }
});

const ContactUs = mongoose.model('ContactUs', Contact);


ContactUs.registerComment = (comment, callback)=>{
    comment.save((err,result)=>{
        if(!err){
            return callback(null, 'Enregistrement réussi');
        }else{
            console.log(err);
            callback('Erreur d\'enregistrement');
        }
    });
}

module.exports = ContactUs;