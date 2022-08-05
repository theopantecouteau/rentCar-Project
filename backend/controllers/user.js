const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { json } = require("body-parser");
require('dotenv').config();

exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then( (hash) => {
        const user = new User({
            nom : req.body.nom,
            prenom : req.body.prenom,
            telephone : req.body.telephone,
            mail : req.body.email,
            email : req.body.email,
            password: hash,
            admin : false
        });
        user.save()
            .then(() => res.status(201).json({message : "Utilisateur crée !"}))
            .catch((err) => {res.status(400).json({err});
                            console.log(user.nom);
                            console.log(user.prenom);
                            console.log(user.telephone);
                            console.log(user.mail);
                            console.log(err)})
    })
    .catch((err) => res.status(500).json({err}))
}

exports.login = (req,res,next) => {
    User.findOne({email : req.body.email})
    .then((user => {
        if (!user){
            return res.status(401).json({message : "Utilisateur n'existe pas"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if (!valid) {
                return res.status(401).json({message: "Mot de passe incorrect"})
            }
            const token = jwt.sign({userId : user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1h'});
            res.status(200).json({userId : user._id, token : token});
            return token;
        })
        .catch ((err) => resstatus(500).json({err}))
    }))
    .catch((err) => res.status(400).json({err}));
}

exports.getOneUser = (req, res, next) => {
    console.log(req.query.id);
    User.findById(mongoose.Types.ObjectId(req.query.id)).then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.modifyInfo= (req, res, next) => {
  console.log(req.body.nom);
  User.updateOne({"_id" : mongoose.Types.ObjectId(req.body.id)},
  { $set: {
      nom :  req.body.nom,
      prenom : req.body.prenom,
      mail : req.body.mail,
      email: req.body.mail,
      telephone : req.body.telephone}
  }).then(() => res.status(201).json({message: "objet modifié"}))
    .catch((err) => res.status(401).json({err : err}));
}

exports.removeUser = (req, res, next) => {
  console.log(req.query.id);
  User.deleteOne({"_id": mongoose.Types.ObjectId(req.query.id)}).then(() => res.status(200).json({message : "bien supprimé"})).catch((err) => res.status(400).json({err : err}));
}

exports.getAllUser = (req, res, next) => {
  User.find().then((users) => res.status(200).json(users))
             .catch((err)=>res.status(400).json(err));
}