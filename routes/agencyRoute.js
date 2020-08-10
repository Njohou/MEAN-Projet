const express = require('express');
var router = express.Router();
const Agency = require('../models/agency');
const { db } = require('../models/agency');
const programs = require('../models/programs');


/** create new agency  */
// router.post('/createAgency', (req,res)=>{
//     const agency = new Agency({
//         code : 0,
//         nom  : "Touristique",
//         description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem deleniti tempora, possimus, officia quod ipsa blanditiis harum ducimus impedit corrupti sed iure aperiam consequatur, architecto laborum libero voluptate illum animi!",
//         programs : 
//                [{
//                     jour : "Lundi",
//                     trajet : "Yaoundé-Douala",
//                     heureDepart : "10:00",
//                     heureArrivee : "13:30",
//                     plaqueImm : "CE 908 DLE",
//                     nomChauffeur : "Moussango",
//                     Prix : 4500,
//                     placedispo : 10
//                 },
//                 {
//                     jour : "Mercredi",
//                     trajet: "Yaoundé-Bertoua", 
//                     heureDepart : "05:00", 
//                     heureArrivee:"9:30", 
//                     plaqueImm:"LT 900 DLR", 
//                     nomChauffeur: "ossango",
//                     Prix: 6500,
//                     placedispo : 10
//                 },
//                 {
//                     jour : "Samedi",
//                     trajet: "Yaoundé-Bafoussam", 
//                     heureDepart : "12:00", 
//                     heureArrivee:"15:30",
//                     plaqueImm :"CE 208 DLE",
//                     nomChauffeur: "Ossongo",
//                     Prix: 7500,
//                     placedispo : 10
//                 }] 
        
        
//     });

//     // {
//     //     "code" : 0,
//     //     "nom" : "Touristique",
//     //     "description" : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem deleniti tempora, possimus, officia quod ipsa blanditiis harum ducimus impedit corrupti sed iure aperiam consequatur, architecto laborum libero voluptate illum animi!",
//     //     "programs" : [
//     //         {"jour" : "Lundi","trajet": "Yaoundé-Douala", "heureDepart" : "10:00", "heureArrivee":"13:30","plaqueImm":"CE 908 DLE", "nomChauffeur": "Moussango","Prix": 4500},
//     //         {"jour" : "Mercredi","trajet": "Yaoundé-Bertoua", "heureDepart" : "05:00", "heureArrivee":"9:30","plaqueImm":"LT 900 DLR", "nomChauffeur": "ossango","Prix": 6500},
//     //         {"jour" : "Samedi","trajet": "Yaoundé-Bafoussam", "heureDepart" : "12:00", "heureArrivee":"15:30","plaqueImm":"CE 208 DLE", "nomChauffeur": "Ossongo","Prix": 7500}
//     //     ]
//     // }

//     // {
//     //     jour : req.body.jour,
//     //     trajet : req.body.trajet,
//     //     heureDepart : req.body.heureDepart,
//     //     heureArrivee : req.body.heureArrivee,
//     //     plaqueImm : req.body.plaqueImm,
//     //     nomChauffeur : req.body.nomChauffeur,
//     //     Prix : req.body.Prix
//     // }

//     // jour : String,
//     // trajet : String,
//     // heureDepart : String,
//     // heureArrivee : String,
//     // plaqueImm : String,
//     // nomChauffeur : String,
//     // Prix : Number

//     agency.save((err, doc)=>{
//         if(!err)
//             return res.status(200).send(doc);
//         else
//             console.log('erreur : ' +err);
//     });
// });

// create a agency
router.post('/createAgency', (req,res)=>{
    const agence  = new Agency({
        code : req.body.code,
        nom  : req.body.nom,
        description : req.body.description,
        programs : req.body.programs
    });

    agence.save((err, doc)=>{
        if(!err)
            return res.status(200).send(doc);
        else
            console.log('erreur : ' +err);
    });
});


/** Get one agency with the code */
router.get('/viewAgency/:code', (req,res,next)=>{
    const code = req.params.code;
    Agency.findOne({code:code}, (err, doc)=>{
        if(!err){
            res.send(doc);
        }else{
            console.log('Erreur de recupération : '+err);
        }
    });
});


// create a programs of the week or day
router.post('/createPrograms', (req,res)=>{
    const code = req.body.code;
    const InsertPrograms = {
            jour : req.body.jour,
            trajet : req.body.trajet,
            heureDepart : req.body.heureDepart,
            heureArrivee : req.body.heureArrivee,
            plaqueImm : req.body.plaqueImm,
            nomChauffeur : req.body.nomChauffeur,
            Prix : req.body.Prix,
            placedispo : req.body.placedispo 
    };

    Agency.findOne({code : code}, (err, agence)=>{
        if(!err){
            
            var tab = agence.programs;
            var j = tab.length;

            tab[j] = InsertPrograms;
            
            db.collection("agencies").updateMany({code : code}, { $set : {programs : tab} }, (err, result)=>{
                if(!err){
                    return res.status(200).send('Enregistrement réussi : ' +result);
                }else{
                    return res.status(404).send('Insertion error : ' +err);
                }
            });
        }else{
            return res.status(404).send('Erreur : ' +err);
        }
    });
});


// Find agency in database
router.post('/ResearchPrograms', (req,res)=>{

    const program = new programs({
        nom : req.body.nom,
        jour : req.body.jour,
        heureDepart : req.body.heureDepart,
        trajet : req.body.trajet,
        Prix : req.body.Prix
    });
    

        console.log(program.nom, program.jour);

        Agency.findOne({nom: program.nom},(err,doc)=>{
            var programs = doc.programs;
            var tab = [];
            for (let i = 0; i < programs.length; i++) {  
                if(programs[i].jour === program.jour || programs[i].trajet === program.trajet || programs[i].Prix === program.Prix || programs[i].heureDepart === program.heureDepart){ 
                    tab[i] = programs[i];
                }
            }
            if(tab.length > 0){
                return res.status(200).json(tab);
            }else{
                return res.status(200).json('No items were found in the database');
            }
        });
});


module.exports = router;