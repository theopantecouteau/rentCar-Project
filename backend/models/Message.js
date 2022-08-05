const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const messageSchema = mongoose.Schema({
    from : {type: String, required: true},
    to: {type: String, required: true},
    message : {type : String, required: true}
});
messageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Message', messageSchema)