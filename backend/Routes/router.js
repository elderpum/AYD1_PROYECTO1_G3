const express = require('express');
const router = express.Router();
const routerEstudiante = require ('./routerEstudiantes.js');

//Routes Estudiantes
router.use('/estudiantes', routerEstudiante);

module.exports = router;
