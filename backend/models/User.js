const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
    nom : {type: String, required: true},
    prenom : {type: String, required: true},
    telephone : {type: String, required: true},
    mail : {type: String, required: true, unique: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    admin : {type : Boolean, required: true}
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)