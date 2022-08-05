const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const voitureSchema = mongoose.Schema({
    nom: {type: String, required: true},
    type : {type : String, required: true},
    description : {type : String, required :true},
    prix : {type: Number, required : true},
    nbPlace : {type: Number, required: true},
    ouicar : {type: String, required: true},
    getaround : {type: String, required: true},
    image : {type : String, required: true},
    id: {type : Number, required: true}
});
voitureSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Voiture', voitureSchema)