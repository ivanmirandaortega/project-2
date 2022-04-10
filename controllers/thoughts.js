const Thought = require('../models/thoughts');

module.exports = {
    index
};

function index(req, res) {
    console.log(req.user, ' <- req.user')
    Thought.find({}, function (err, thoughts) {
        res.render('thoughts/index', {
            thoughts,
            title: "Feed"
        })
    })
}