const express = require('express');
const router = express.Router();
const controllerEstudiante = require('../Controllers/controllerEstudiante')

//GET
router.get('/estudiantesEje',controllerEstudiante.ejemplo)
router.get('/getAll', controllerEstudiante.getAll)


//POST
router.post('/add', controllerEstudiante.add)
router.post('/asistirEvento', controllerEstudiante.asistirEvento)


module.exports = router