const express = require('express');
const router = express.Router();
const controllerOrganizador = require('../Controllers/controllerOrganizador')

//GET
router.get('/organizadoresEje',controllerOrganizador.ejemplo)
router.get('/getAll', controllerOrganizador.getAll)


//POST
router.post('/add', controllerOrganizador.add)

module.exports = router