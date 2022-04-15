const Thought = require('../models/thought');

module.exports = {
    index,
    show,
    create,
    new: newThought,
    edit,
    update
};

// shows the replies from a user thought
function show(req, res) {
    Thought.findById(req.params.id).populate('replies').exec(function (err, thought) {
        res.render('thoughts/show', { title: 'Replies', thought })
    })
};

// takes user to form that submits a new thought
function newThought(req, res) {
    res.render('thoughts/new', { title: 'Share A Thought' })
};

// shows all the thoughts from all users
function index(req, res) {
    Thought.find({}, function (err, thought) {
        res.render('thoughts/index', {
            thought,
            title: "Feed"
        })
    })
};

// adds and saves the new user thought 
function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.replies = [];
    const thought = new Thought(req.body)
    thought.save(function (err) {
        if (err) return
        res.redirect('/feed')
    })
};

// takes user to the edit form for a thought
function edit(req, res) {
    Thought.findById(req.params.id, function (err, thought) {
        if (!thought.user.equals(req.user._id)) return
        res.render('thoughts/edit', { thought, title: "Edit A Thought" })
    })
};

// updates and saves the edited thought 
function update(req, res) {
    Thought.findById(req.params.id, function (err, thought) {
        thought.content = req.body.content
        thought.save();
        res.redirect(`/feed`);
    })
};