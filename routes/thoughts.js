const express = require("express")
const router = express.Router();
const thoughtsController = require('../controllers/thoughts');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, thoughtsController.index);


module.exports = router;