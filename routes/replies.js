const express = require("express")
const router = express.Router();
const replyController = require('../controllers/replies')
const isLoggedIn = require('../config/auth');

// GET /feed/thoughts/:id/replies 
router.post('/feed/thoughts/:id/replies', isLoggedIn, replyController.create);

module.exports = router; 