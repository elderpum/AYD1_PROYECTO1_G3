const express = require('express');
const router = express.Router();
const routerEstudiante = require ('./routerEstudiantes.js');
const routerAdmin = require ('./routerAdmin.js');
const routerAuth = require ('./routerAuth.js');

//Routes Estudiantes
router.use('/estudiantes', routerEstudiante);

//Routes Administrador
router.use('/admin',routerAdmin)

//Routes Auth
router.use('/auth', routerAuth);

module.exports = router;
