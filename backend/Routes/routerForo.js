const express = require('express');
const router = express.Router();
const controllerForo = require('../Controllers/controllerForo');
const controllerAccess = require('../Controllers/controllerAccess');

//GETS
router.get('/getForos', controllerAccess.isOrganizerOrStudent, controllerForo.getForos);

//POSTS
router.post('/crearForo', controllerAccess.anyRole, controllerForo.add);

module.exports = router;