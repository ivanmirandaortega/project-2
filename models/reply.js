const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    thought: {
        type: Schema.Types.ObjectId, ref: 'Thought'
    },
    content: String,
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    userName: String,
    userAvatar: String
});

module.exports = mongoose.model('Reply', replySchema); 