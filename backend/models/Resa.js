const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const resaSchema = mongoose.Schema({
    depart : {type: Date, required: true},
    retour: {type: Date, required: true},
    heureDepart : {type : Number, required: true},
    heureRetour : {type : Number, required: true},
    voiture : {type: String, required: true},
    idClient : {type: String, requires: true}
});
resaSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Resa', resaSchema)