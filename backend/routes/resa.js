const express = require('express');
const router = express.Router();
const resaControl = require("../controllers/resa");

router.post('/save', resaControl.reservation );
router.get('/display', resaControl.getAllResa);
router.get('/display/:id', resaControl.getResaById);
router.delete('/remove', resaControl.removeResa);

module.exports = router;