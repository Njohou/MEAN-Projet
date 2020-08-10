const express = require('express');
var router = express.Router();
const multer = require('multer');
const ObjectId = require('mongoose').Types.ObjectId;

const Covoiture = require('../models/covehicule');
const Minus = require('../models/Minus');
const User = require('../models/user');



router.post('/createProfil', (req,res)=>{
    var covoiture = new Covoiture({
        username : req.body.username,
        immatriculation : req.body.immatriculation,
        placedispo : req.body.placedispo,
        dateDepart : req.body.dateDepart,
        posteDate : req.body.posteDate,
        destination : req.body.destination,
        chauffeur : req.body.chauffeur
    });
    console.log(covoiture.username+','+covoiture.immatriculation+','+covoiture.placedispo+','+covoiture.dateDepart+','+covoiture.posteDate);

    Covoiture.createProfil(covoiture, (err, result)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(result);
        }
    });
});

//Get all profiles in database
router.get('/showProfil', (req,res)=>{
    Covoiture.find((err, docs)=>{
        if (!err) {
            res.send(docs);
        }
        else{
            console.log('Error in retriving User : ' +JSON.stringify(err,undefined,2));
        }
    });
});

// get a specific carpooler post
router.get('/getCarpoolerPost/:username', (req,res)=>{
    Covoiture.find({username : req.params.username}, (err, doc)=>{
        if(!err){
            return res.status(200).json(doc);
        }else{
            return res.json(err);
        }
    })
})

// Get a profil by id
router.get('/showProfil/:id', (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with Carpooler : ${req.params.id}`);
    }
    /**   Chercher le profil par id et le transmettre au front-end    */
    Covoiture.findById(req.params.id, (err, doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Erreur de recupération : '+err);
        }
    });
});

// Fonction post pour diminuer le nombre de reservation
router.post('/Minus', (req,res)=>{
    const minus = new Minus({
        _id : req.body._id,
        reservePlace : req.body.reservePlace
    });

    console.log(minus._id+','+minus.reservePlace);

    Covoiture.findById({ _id : minus._id }, (err, carpooler)=>{
        if(!err){
            var nombreCarpooler = carpooler.placedispo;
                /**   voir si la valeur est dans la norme   */
                if(nombreCarpooler < 1){
                    /**  Recherche le document par id et le supprimer par après   */
                    Covoiture.findByIdAndDelete({_id : minus._id}, (err, result)=>{
                        if(!err){
                            return res.json('Suppression réussie !!'); 
                        }else{
                           return res.json('Suppression échouée !!'); 
                        }
                    });
                }else{
                    /**  faire une soustraction entre la donnée de la BD et celle entrée */
                    var diminu = nombreCarpooler - minus.reservePlace;
                    /**   Remplace l'ancienne valeur dans la BD par la nouvelle   */
                    Covoiture.updateOne({ placedispo : carpooler.placedispo}, { $set : { placedispo : diminu}} , (err, result)=>{
                        if(!err){
                            if(diminu <= 0){
                                Covoiture.findByIdAndDelete({_id : minus._id}, (err, result)=>{
                                    if(!err){
                                        return res.json('Suppression réussie !!');
                                    }else{
                                       return res.json('Suppression échouée !!'); 
                                    }
                                });
                            }
                            return res.json('Updated successfully !!');
                        }else{
                            return res.json('Erreur de modification :' +err);
                        }
                    });
                }
        }else{
            return res.json('Erreur : ' +err);
        }
    })
});

module.exports = router;