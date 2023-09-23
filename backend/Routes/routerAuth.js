const express = require('express');
const router = express.Router();
const controllerAuth = require('../Controllers/controllerAuth')

//POSTS
router.post('/login', controllerAuth.login)

module.exports = router;