const expess = require('express');
const router = expess.Router();
const controllerEvent = require('../Controllers/controllerEvent');
const controllerAccess = require('../Controllers/controllerAccess');

//GETS
router.get('/getAvailables', controllerAccess.isAStudent ,controllerEvent.getAvailable)

//POSTS
router.post('/create', controllerAccess.isAnOrganizer, controllerEvent.create);

module.exports = router;