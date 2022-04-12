const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const thoughtSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    content: String,
    userName: String,
    userAvatar: String,
    replies: {
        type: [Schema.Types.ObjectId],
        ref: 'Reply'
    }
});


module.exports = mongoose.model('Thought', thoughtSchema); 