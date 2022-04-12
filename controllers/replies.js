const Thought = require('../models/thought');
const Reply = require('../models/reply');
const { remove } = require('../models/thought');

module.exports = {
    create,
    delete: deleteReply
}

// function deleteReply(req, res, next) {
//     Thought.findOne({ 'replies._id': req.params.id }, function (err, thoughtDocument) {
//         const reply = thoughtDocument.replies.id(req.params.id);
//         if (!reply.user.equals(req.user._id)) return
//         reply.remove();
//         thoughtDocument.save(function (err) {
//             if (err) next(err);
//             res.redirect(`/feed/thoughts/${thoughtDocument._id}`)
//         })
//     })
// };


function deleteReply(req, res) {
    Thought.findById(req.params.id, function (err, thought) {
        if (!thought || err) return res.redirect(`/feed/thoughts/${thought._id}`)
        thought.replies.remove(req.params.reply_id)
        thought.save(function (err) {
            console.log(err, ' <-err')
            console.log(thought, ' <-thought')
            res.redirect(`/feed/thoughts/${thought._id}`)
        })
    })
};




function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Thought.findById(req.params.id, function (err, thought) {
        // console.log(thought)
        Reply.create(req.body, function (err, reply) {
            console.log(reply, ' <-reply')
            thought.replies.push(reply)
            thought.save(function (err) {
                res.redirect(`/feed/thoughts/${thought._id}`)
            })
        })
    })
}

// function create(req, res) {
//     Thought.findById(req.params.id, function (err, thought) {
//         req.body.user = req.user._id;
//         req.body.userName = req.user.name;
//         req.body.userAvatar = req.user.avatar;
//         thought.replies.push(req.body);
//         thought.save(function (err) {
//             res.redirect(`/feed`)
//         })
//     })
// }