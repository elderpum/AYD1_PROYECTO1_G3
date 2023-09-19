const express = require('express');
const router = express.Router();
const routerEstudiante = require ('./routerEstudiantes.js');
const routerAdmin = require ('./routerAdmin.js');
const routerAuth = require ('./routerAuth.js');
const routerEvent = require ('./routerEvent.js');
const routerOrganizador = require ('./routerOrganizador.js');
const routerMaterial = require ('./routerMaterial.js');


//Routes Estudiantes
router.use('/estudiantes', routerEstudiante);

//Routes Administrador
router.use('/admin',routerAdmin)

//Routes Auth
router.use('/auth', routerAuth);

//Routes Events
router.use('/events', routerEvent);

//Routes Organizador
router.use('/organizador', routerOrganizador);

//Routes Materiales
router.use('/materiales', routerMaterial);

module.exports = router;
