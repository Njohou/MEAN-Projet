const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

const Reservation = require('../models/reservation');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'XXXXXXXXX@XXXX.XXX',
        pass: 'XXXXXXXXXXXXX'
    } 
});

// verifie a information send in angular 
router.post('/reserveCovoiture', (req,res,next)=>{
    const reserve = new Reservation({       // Take a differents informations send in angular page
        username : req.body.username,       
        email : req.body.email,
        provider : req.body.provider
    });

    //console.log(reserve.username);
    User.findOne({username : reserve.username, email : reserve.email}, (error, user)=>{
        if(error){
            console.log(error);
            return res.status(400).json('Server Error');
        }else if(user == undefined){
            return res.json('Username and/or email not found, or incorrect');  // if username and/or email not found in database
        }else{
            return res.status(200).json('Vérification terminée !!');
        }
    });
});


// send a Mail with QRcode
router.post('/MailCarpooler', (req,res)=>{
    const reserve = new Reservation({       // Take a differents informations send in angular page
        username : req.body.username,       
        email : req.body.email,
        provider : req.body.provider
    });
    console.log(reserve.email+','+reserve.provider+','+reserve.username);

    User.findOne({username : reserve.provider}, (error, user)=>{  // Found a user who post a message carpooling
        if(error){
            console.log(error);
            return res.status(400).json('Server Error');
        }else if(user === undefined){
            return res.json('Username not found !!');  // if username and/or email not found in database
        }else{
            //console.log(user.email+','+user.telephone+','+user.username+','+reserve.username);
            var mailOptions = {
                from: 'XXXXXXXXXXXXXX@XXXXX.XXX',
                to: reserve.email,
                subject: 'Reservation de covoiturage',
                text : 'Félicitation '+ reserve.username +', voici le numéro de téléphone de l\'utilisateur '+ user.telephone+'.'
            }
            transporter.sendMail(mailOptions, (error,info)=>{
                if(error){
                    return res.json(error);
                }else{
                    return res.json('Mail has been sent');   
                }
            });   
        }
    });
});

module.exports = router;
