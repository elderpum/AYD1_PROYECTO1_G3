const express = require('express');
const router = express.Router();
const controllerOrganizador = require('../Controllers/controllerOrganizador')
const controllerAccess = require('../Controllers/controllerAccess');

//GET
router.get('/organizadoresEje',controllerOrganizador.ejemplo)
router.get('/getAll', controllerOrganizador.getAll)


//POST
router.post('/add', controllerAccess.isAnOrganizer, controllerOrganizador.add)
router.post('/getAllEvents', controllerAccess.isAnOrganizer ,controllerOrganizador.getEvents)

module.exports = router