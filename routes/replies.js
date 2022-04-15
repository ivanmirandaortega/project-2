const express = require("express")
const router = express.Router();
const replyController = require('../controllers/replies')
const isLoggedIn = require('../config/auth');

// GET /feed/thoughts/#####/replies 
router.post('/feed/thoughts/:id/replies', isLoggedIn, replyController.create);
// DELETE /feed/thoughts/######
router.delete('/feed/thoughts/:id/replies/:reply_id', isLoggedIn, replyController.delete);

module.exports = router; 