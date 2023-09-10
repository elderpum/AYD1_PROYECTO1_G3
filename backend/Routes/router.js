const express = require('express');
const router = express.Router();
const routerEstudiante = require ('./routerEstudiantes.js');
const routerAdmin = require ('./routerAdmin.js');

//Routes Estudiantes
router.use('/estudiantes', routerEstudiante);

//Routes Administrador
router.use('/admin',routerAdmin)


module.exports = router;
