const express = require('express');
const router = express.Router();
const messageControl = require("../controllers/message");

router.post('/send', messageControl.sendMessage);
router.get('/display', messageControl.getAllMessage);
router.delete('/remove', messageControl.removeMessage);

module.exports = router;