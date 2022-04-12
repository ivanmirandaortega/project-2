const Thought = require('../models/thought');

module.exports = {
    index,
    show,
    create,
    new: newThought,
    edit,
    update
};

// function show(req, res) {
//     Thought.findById(req.params.id, function (err, thought) {
//         console.log(thought, ' <- thought')
//         console.log(req.params.id, ' <- req.params.id')
//         res.render('thoughts/show', {
//             thought,
//             title: "Replies"
//         })
//     })
// };

function show(req, res) {
    Thought.findById(req.params.id).populate('replies').exec(function (err, thought) {
        console.log(thought);
        res.render('thoughts/show', { title: 'Replies', thought })
    })
}

function newThought(req, res) {
    res.render('thoughts/new', { title: 'Share A Thought' })
};

function index(req, res) {
    console.log(req.user, ' <- req.user')
    Thought.find({}, function (err, thought) {
        // console.log(thought, ' <- not sure ')
        res.render('thoughts/index', {
            thought,
            title: "Feed"
        })
    })
};

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.replies = [];
    console.log(req.body, " <-req.body")
    const thought = new Thought(req.body)
    thought.save(function (err) {
        if (err) return
        console.log(thought, ' <- this is a new thought')
        res.redirect('/feed')
    })
};

function edit(req, res) {
    Thought.findById(req.params.id, function (err, thought) {
        if (!thought.user.equals(req.user._id)) return
        res.render('thoughts/edit', { thought, title: "Edit A Thought" })
    })
}

function update(req, res) {
    Thought.findById(req.params.id, function (err, thought) {
        console.log(thought, " <- thought")
        thought.content = req.body.content
        console.log(thought.content, ' <- thought.content');
        thought.save();
        res.redirect(`/feed`);
    });
};