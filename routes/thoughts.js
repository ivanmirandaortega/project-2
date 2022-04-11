const express = require("express")
const router = express.Router();
const thoughtsController = require('../controllers/thoughts');
const isLoggedIn = require('../config/auth');

// GET /feed
router.get('/', isLoggedIn, thoughtsController.index);
// GET /feed
router.get('/thoughts/new', isLoggedIn, thoughtsController.new);

// POST /feed
router.post('/', thoughtsController.create);



module.exports = router;