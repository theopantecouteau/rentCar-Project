const Resa = require("../models/Resa");
const mongoose = require('mongoose');
const jwt= require("jsonwebtoken");

exports.reservation = (req, res, next) => {
        const resa =  new Resa({
            depart : req.body.depart,
            retour : req.body.retour,
            heureDepart : req.body.heureDepart,
            heureRetour : req.body.heureRetour,
            voiture : req.body.voiture,
            idClient : req.body.idClient
        })
        resa.save()
            .then((resa) => res.status(201).json({resa}))
            .catch((err)=> {
                    res.status(400).json({err:err});
                    console.log(err);
             });
                           
        };


exports.getResaById = (req, res, next) => {
    Resa.findOne({id : id})
        .then((res)=> {const depart = res.data.depart;
                        const retour = res.data.retour;
                        const heureDepart = res.data.heureDepart;
                        const heureRetour = res.data.heureRetour;
                        const voiture = res.data.voiture;
                        const idClient = res.data.idClient;
                        res.status(200).json({depart, retour,heureDepart, heureRetour , idClient})
                        });
}

exports.getAllResa = (req, res, next) => {
    Resa.find()
        .then((resa)=> res.status(200).json({resa}));
}

exports.removeResa = ( req, res, next) => {
    Resa.deleteOne({"_id": mongoose.Types.ObjectId(req.query.id)}).then(() => res.status(200).json({message : "bien supprimé"})).catch((err) => res.status(400).json({err : err}));
}