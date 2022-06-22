const express = require('express');
const controllerLogin = require('./controllers/controllerLogin');
const controllerUser = require('./controllers/controllerUser');
const controllerCategory = require('./controllers/controllerCategory');
const controllerPost = require('./controllers/controllerPost');

const router = express.Router();

router.use('/login', controllerLogin);
router.use('/user', controllerUser);
router.use('/categories', controllerCategory);
router.use('/post', controllerPost);

module.exports = router;