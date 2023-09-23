const express = require('express');
const router = express.Router();
const controllerEstudiante = require('../Controllers/controllerEstudiante')
const controllerAccess = require('../Controllers/controllerAccess');

//GET
router.get('/estudiantesEje',controllerEstudiante.ejemplo)
router.get('/getAll', controllerEstudiante.getAll)


//POST
router.post('/add', controllerEstudiante.add)
router.post('/asistirEvento', controllerAccess.anyRole, controllerEstudiante.asistirEvento)


module.exports = router