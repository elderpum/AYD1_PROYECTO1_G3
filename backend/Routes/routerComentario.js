const express = require('express');
const router = express.Router();
const controllerComentario = require('../Controllers/controllerComentario');
const controllerAccess = require('../Controllers/controllerAccess');

//GETS
router.get('/getComentarios', controllerComentario.getComentarios);

//POSTS
router.post('/crearComentario', controllerAccess.isOrganizerOrStudent, controllerComentario.add);

module.exports = router;