const expess = require('express');
const router = expess.Router();
const controllerEvent = require('../Controllers/controllerEvent');
const controllerAccess = require('../Controllers/controllerAccess');

//POSTS
router.post('/create', controllerAccess.isAnOrganizer, controllerEvent.create);

//GETS
router.get('/get-mis-eventos', controllerAccess.isAStudent, controllerEvent.getEventsByStudent);

module.exports = router;