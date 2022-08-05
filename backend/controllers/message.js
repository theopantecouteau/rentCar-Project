const Message = require("../models/Message");
const mongoose = require('mongoose');
const jwt= require("jsonwebtoken");

exports.sendMessage = (req, res, next) => {
    const message =  new Message({
        from : req.body.from,
        to :  req.body.to,
        message : req.body.message,
    })
    message.save()
           .then((mess) => res.status(201).json({message : mess}))
           .catch((err)=> { res.status(400).json({err:err});
                            console.log(err);});
}

exports.getAllMessage = (req, res, next) => {
    Message.find()
           .then((mess)=> res.status(200).json({mess}));
}

exports.removeMessage = (req, res, next) =>{
    Message.deleteOne({"_id": mongoose.Types.ObjectId(req.query.id)}).then(() => res.status(200).json({message : "bien supprimé"}))
                                                                     .catch((err) => res.status(400).json({err : err}));
}