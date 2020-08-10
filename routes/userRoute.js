const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const ObjectId = require('mongoose').Types.ObjectId;

var User = require('../models/user');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'groupe11test@gmail.com',
        pass: 'TestpourProjetISI11'
    } 
});

var storage = multer.diskStorage({
    destination : function(req, file ,callback){
        callback(null, '../Angular/src/assets/imageProfil/');
    },
    filename: function(req,file,callback){
        callback(null, file.originalname);
    }
});


var upload = multer({ storage : storage });

router.post('/profilImage', upload.single('file'), (req,res,next)=>{
    const file = req.file;
    console.log(file.filename);

    if(!file){
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error);
    }
    return res.status(400).json('Image uploaded successfully !!');

});

router.put('/SaveImageName', (req, res)=>{
    var filename = req.body.filename;
    var username = req.body.username;
    console.log(filename , username);

        User.findOneAndUpdate({username : username}, { $set : { "photo" : filename} }, (error, resp)=>{                
            if(!error){            
                return res.status(200).json("Update image done !! " +resp);
            }else{
                return res.status(400).json(error);
            }
        });
        // console.log('Hello');
       
});

// get user informations profil
router.get('/userprofil/:username', (req,res)=>{
    User.findOne({ username : req.params.username },(err, docs)=>{
        if (!err) {
            res.send(docs);
        }
        else{
            console.log('Error in retriving User : ' +JSON.stringify(err,undefined,2));
        }
    });
});


// Update user informations
router.put('/UpdateUser/:id', (req,res, next)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with User : ${req.params.id}`);
    }
    
    const users = new User({
        _id : req.params.id,
        username : req.body.username,
        email : req.body.email,
        telephone : req.body.telephone,
        password : req.body.password 
    });
    
    User.findById(req.params.id, (error, user)=>{
        if(!error){
            //console.log(user.username);
            User.updateUser(user, users,  (err,result)=>{
                if(!err){
                    return res.json(result); 
                }else{
                    return res.json(result);
                }   
            });
        }else{
            console.log('username not found !!');
        }
     });
});


// remove user account
router.delete('/deleteAccount/:_id', (req, res)=>{
    if(!ObjectId.isValid(req.params._id)){
        return res.status(400).send(`No record with Carpooler : ${req.params._id}`);
    }
    console.log(req.params._id);
    User.findByIdAndRemove(req.params._id,(err)=>{
        if(!err){
            return res.json('Delete done !!');
        }else{
            return res.json('Erreur de suppression : ' +err);
        }
    });

});


/** add a user in DB **/
router.post('/register', (req,res)=>{

    var user = new User({
        username : req.body.username,
        email : req.body.email,
        telephone : req.body.telephone,
        password : req.body.password,
    });
    //console.log(user.email+','+user.username);
    User.registerUser(user,(err, result)=>{
        //console.log(user.email+','+user.username);
        if(err){
            return res.json(err); 
        }else{
            console.log(user.email+','+user.username);
            var mailOptions = {
                from: 'groupe11test@gmail.com',
                to: user.email,
                subject: 'Création de votre compte Camtravel',
                html : '<p>Félicitation <b><i>'+user.username+ '</i></b>, votre compte <h2 style="color : #7cb62f">Camtravel</h2> a été crée avec succès.</p><br>'+
                ' Vous avez désormais accès à nos différents services parmi lesquels : '+
                '<ul>'+
                '<li> la réservation des tickets de bus; </li>'+
                '<li> la mise en ligne de votre profil covoitureur; </li>'+
                '<li> la mise en ligne de vos commentaires et de vos appréciations; </li>'+
                '<li> sans oublier l\'envoi par mail de vos remarques; </li>'+
                '</ul><br>'+
                '<p> Nous espérons que vous profiterez de l\'expérience qu\'offre notre site </p>'+
                '<br><br><h2>Cordialement, l\'équipe technique.</h2></br>'
            }
            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    return res.json(error);
                }else{
                    return res.json(result);                  
                }
            });   
        }
    });     
});

/** Login User **/

router.post('/login', (req, res)=> {
    User.loginUser(req.body.username, req.body.password, (err, result)=>{
        if(err){
            return res.json(err);
        }else{
            return res.status(200).json(result);
        }
    })    
});


router.get('/username', verifyToken, (req, res, next)=>{
    return res.status(200).json(decodedToken.username);
})



var decodedToken = '';
function verifyToken(req, res, next){
    let token  = req.query.token;

    jwt.verify(token, 'secret', (err, tokendata)=>{
        if(err){
            return res.status(400).json({message : 'Unauthorized request'});
        }
        if(tokendata){
            decodedToken = tokendata;
            next();
        }
    });
}


module.exports = router;