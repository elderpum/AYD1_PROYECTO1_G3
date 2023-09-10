const express = require('express');
const router = express.Router();
const controllerEstudiante = require('../Controllers/controllerAdmin')

//GET
router.get('/estudiantesEje',controllerEstudiante.ejemplo)
router.get('/getAllUsers', controllerEstudiante.getAllEstudiantes)


//POST


module.exports = router