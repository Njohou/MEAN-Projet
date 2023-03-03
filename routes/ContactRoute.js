const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

const Contact = require('../models/contactUs');
const Recommend = require('../models/recommend');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'XXXXXXXXXXXXXXXXXX@XXXX.XXX',
        pass: 'XXXXXXXXXXXXX'
    } 
});


/**  Save and get a different comment in DB  **/
router.post('/saveComment', (req,res)=>{
    const comment = new Contact({
        username : req.body.username,
        post : req.body.post,
        datePost : req.body.datePost
    });

    Contact.registerComment(comment, (err, result)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(result);
        }
    });
});


router.get('/getComment', (req,res)=>{
    Contact.find((err,doc)=>{
        if(!err){
            return res.json(doc);
        }else{
            return res.json('Erreur :'+err);
        }
    });
});
/**    End     **/

router.get('commentUser/:username', (req,res)=>{
    Contact.find({username : req.params.username}, (err,doc)=>{
        if(!err){
            return res.json(doc);
        }else{
            return res.json('Erreur :'+err);
        }
    });
});


// Send mail for recommendation
router.post('/sendmail', (req,res)=>{
    const recommend = new Recommend({
        username : req.body.username,
        message: req.body.message
    });

    var mailOptions = {
        from: 'XXXXXXXXXXXX@XXXX.XXX',
        to: 'XXXXXXXXXXX@XXXX.XXX',
        subject: 'Camtravel ,message de l\'utilisateur '+ recommend.username +', vous expose son opinion.',
        text : recommend.message
    }
    transporter.sendMail(mailOptions, (error)=>{
        if(error){
            return res.json(error);
        }else{
            return res.json('Message has been sent !!');
        }
    });   
});
/**   End  **/

module.exports = router;
