const express = require('express');
const router = express.Router();
const userControl = require("../controllers/user");

router.post('/signup', userControl.signup );
router.post('/login', userControl.login);
router.get('/id', userControl.getOneUser);
router.get('/all', userControl.getAllUser)
router.put('/id', userControl.modifyInfo);
router.delete('/remove', userControl.removeUser);

module.exports = router;