const express = require("express")
const router = express.Router();
const thoughtsController = require('../controllers/thoughts');
const isLoggedIn = require('../config/auth');

// GET /feed
router.get('/', isLoggedIn, thoughtsController.index);
// GET /feed/thoughts/new
router.get('/thoughts/new', isLoggedIn, thoughtsController.new);
// GET /feed/#####
router.get('/thoughts/:id', thoughtsController.show);
// GET /feed/thoughts/#####/edit
router.get('/thoughts/:id/edit', thoughtsController.edit);
// PUT /thoughts/######
router.put('/thoughts/:id', thoughtsController.update);
// POST /feed
router.post('/', thoughtsController.create);

module.exports = router;