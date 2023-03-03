const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const qrcode = require('qrcode');

const Ticket = require('../models/TicketBus');
const User = require('../models/user');
const Agency = require('../models/agency');
const programs = require('../models/programs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'XXXXXXXXXXX@XXXXXX.XXX',
        pass: ''
    } 
});

router.get('/getReservation/:username', (req, res)=>{
    Ticket.find({username : req.params.username},(err, doc)=>{
        if(!err){
            return res.json(doc);  
        }else{
            return res.json('Not items found !!' +err);   
        }   
    });
})

router.post('/TicketAllerSimple', async (req,res)=>{

    const ticket = new Ticket({
        username : req.body.username,
        agence : req.body.agence,
        Trajet : req.body.Trajet,
        Heuredepart : req.body.Heuredepart,
        Jour : req.body.Jour,
        Prix : req.body.Prix,
        Place : req.body.Place,
        PrixTotal : req.body.PrixTotal
    });

    let img = await qrcode.toDataURL(ticket.username+' '+ticket.Trajet+' '+ticket.Jour+' '+ticket.agence);
    console.log(ticket.username);

    Ticket.EnregistrerSendMail(ticket, (err, result)=>{
        if(err){
            return res.json('Erreur : ' +err);
        }else{
            User.findOne({username : ticket.username}, (error,user)=>{
                if(error){
                    console.log('Error : ' +error);
                    return res.json('Error : ' +error);
                }
                console.log(user.email);
                var mailOptions = {
                    from: 'XXXXXXXXX@XXX.XXX',
                    to: user.email,
                    subject: 'Reservation de Ticket de bus',
                    attachDataUrls : true,
                    html : 'Chez client '+user.username+ ', vous venez d\'acheter un ticket de bus dans l\'agence ' + ticket.agence +':' +
                            '<ul>'+
                            '<li> Trajet :' + ticket.Trajet + '</li>'+
                            '<li> Prix Total : ' + ticket.PrixTotal +'</li>'+
                            '<li> Heure de depart: '+ ticket.Heuredepart + '</li>'+
                            '<li> Heure de depart: '+ ticket.Place + '</li><br>'+
                            '</ul><br>'+
                            '<p> Votre qrcode est le suivant : <br>'+
                            '<img src="' + img + '">'
                    
                }
                transporter.sendMail(mailOptions, (error,info)=>{
                    if(error){
                        return res.json(error);
                    }else{
                        console.log('Hello');
                        return res.json('Mail send and '+result);                   
                    }
                });   
            });
        }
    });
});



router.post('/TicketAllerRetour', async(req,res)=>{
    const ticket = new Ticket({
        username : req.body.username,
        agence : req.body.agence,
        Trajet : req.body.Trajet,
        Heuredepart : req.body.Heuredepart,
        Jour : req.body.Jour,
        Prix : req.body.Prix,
        Place : req.body.Place,
        PrixTotal : req.body.PrixTotal,
        ReturnDate : req.body.ReturnDate
    });

    let img = await qrcode.toDataURL(ticket.username+' '+ticket.Trajet+' '+ticket.Jour+' '+ticket.agence);
    console.log(ticket.username);
    console.log(ticket.ReturnDate);

    Ticket.EnregistrerSendMail(ticket, (err, result)=>{
        if(err){
            return res.json('Erreur : ' +err);
        }else{
            User.findOne({username : ticket.username}, (error,user)=>{
                if(error){
                    console.log('Error : ' +error);
                    return res.json('Error : ' +error);
                }
                console.log(user.email);
                var mailOptions = {
                    from: 'XXXXXXXXXXXX@XXXX.XXX',
                    to: user.email,
                    subject: 'Reservation de Ticket de bus',
                    html :  'Chez client '+user.username+ ', vous venez d\'acheter un ticket de bus dans l\'agence ' + ticket.agence +':' +
                            '<ul>'+
                            '<li> Trajet :' + ticket.Trajet + '</li>'+
                            '<li> Prix Total : ' + ticket.PrixTotal +'</li>'+
                            '<li> Heure de depart: '+ ticket.Heuredepart + '</li>'+
                            '<li> Heure de depart: '+ ticket.Place + '</li>'+
                            '<li> Date de retour: '+ ticket.ReturnDate + '</li>'+
                            '</ul><br>'+
                            '<p> Votre qrcode est le suivant : <br>'+
                            '<img src="' + img + '">' 
                }
                transporter.sendMail(mailOptions, (error,info)=>{
                    if(error){
                        return res.json(error);
                    }else{
                        return res.json('Mail send and '+result);                   
                    }
                });   
            });
        }
    });

});



module.exports = router;
