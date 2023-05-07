const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
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
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
}, {
    timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat, Message };