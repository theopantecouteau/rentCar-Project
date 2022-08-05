const Voiture = require("../models/Voiture");
const mongoose = require('mongoose');
const jwt= require("jsonwebtoken");
const crypto = require('crypto');
let algorithm = 'sha256';

exports.saveCar = (req, res, next) => {
    const voiture =  new Voiture({
        nom : req.body.nom,
        type : req.body.type,
        description : req.body.description,
        prix : req.body.prix,
        nbPlace : req.body.nbPlace,
        ouicar : req.body.ouicar,
        getaround : req.body.getaround,
        image : req.body.image,
        id : req.body.id
    })
    voiture.save()
           .then((car) => res.status(201).json({voiture : car}))
           .catch((err)=> { res.status(400).json({err:err});
                            console.log(err);});
}

exports.getAllCars = (req, res, next) => {
    Voiture.find()
           .then((cars)=> res.status(200).json({cars}));
}


