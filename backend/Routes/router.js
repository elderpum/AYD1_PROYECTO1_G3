const express = require('express');
const router = express.Router();
const routerEstudiante = require ('./routerEstudiantes.js');
const routerAdmin = require ('./routerAdmin.js');
const routerAuth = require ('./routerAuth.js');
const routerEvent = require ('./routerEvent.js');

//Routes Estudiantes
router.use('/estudiantes', routerEstudiante);

//Routes Administrador
router.use('/admin',routerAdmin)

//Routes Auth
router.use('/auth', routerAuth);

//Routes Events
router.use('/events', routerEvent);

module.exports = router;
