const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat, Message };