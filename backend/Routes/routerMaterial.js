const express = require('express');
const router = express.Router();
const controllerMaterial = require('../Controllers/controllerMaterial');
const controllerAccess = require('../Controllers/controllerAccess');

//GETS
router.get('/get-materiales', controllerAccess.anyRole, controllerMaterial.getMaterials);

//POSTS
router.post('/materiales-categoria', controllerAccess.anyRole, controllerMaterial.getMaterialsByCategory);
module.exports = router;