const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodeToken.userId;
        req.auth = {
            userId
        }
        if (req.body.userId && req.body.userId != userId){
            throw "User ID non valable";
        }else{
            next();
        }
    }catch (err){
        res.status(401).json({error : err | "requête non identifiée"});
    }
}