const express = require('express');
const router = express.Router();
const voitureControl = require("../controllers/voiture");

router.post('/send', voitureControl.saveCar);
router.get('/display', voitureControl.getAllCars);

module.exports = router;