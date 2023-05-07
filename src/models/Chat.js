const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    chatType: {
        type: String,
        enum: [
            'Chat', // 1:1
            'ChatGroup', // 1:n
        ],
        required: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        refpath: 'chatType',
    },
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

const chatSchema = new mongoose.Schema({
    users: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        required: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
}, {
    timestamps: true,
});

const Chat = mongoose.model('Chat', chatSchema);

const chatGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 30,
        required: true,
    },
    description: {
        type: String,
        maxLength: 300,
    },
    users: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        required: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
}, {
    timestamps: true,
});

const ChatGroup = mongoose.model('ChatGroup', chatGroupSchema);

module.exports = {
    Chat,
    Message,
    ChatGroup,
};