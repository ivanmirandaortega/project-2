const Thought = require('../models/thought');
const Reply = require('../models/reply');

module.exports = {
    create,
    delete: deleteReply
}
// delete reply from user on a user thought 
function deleteReply(req, res) {
    Thought.findById(req.params.id, function (err, thought) {
        if (!thought || err) return res.redirect(`/feed/thoughts/${thought._id}`)
        thought.replies.remove(req.params.reply_id)
        thought.save(function (err) {
            res.redirect(`/feed/thoughts/${thought._id}`)
        })
    })
};

// create a reply from user on a user thought
function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Thought.findById(req.params.id, function (err, thought) {
        Reply.create(req.body, function (err, reply) {
            thought.replies.push(reply)
            thought.save(function (err) {
                res.redirect(`/feed/thoughts/${thought._id}`)
            })
        })
    })
};