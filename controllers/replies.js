const Thought = require('../models/thought');
const Reply = require('../models/reply')

module.exports = {
    create
}

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