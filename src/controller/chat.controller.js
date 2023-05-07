const User = require('../models/User');
const { Chat, Message } = require('../models/Chat');
const { getChatGroupName } = require('../services/chat.service');

/**
 * Create a chat.
 * Body must contain:
 * - name: String (optional)
 * - users: Array of users id
 * 
 * Body response:
 * - message: String
 * - chatId?: String
 */
const createChat = async (req, res) => {
    try {
        const user = res.locals.user;
        const { name, users } = req.body;

        // Find users and return only name and surname
        const usersFound = await User.find({_id: {$in: users}}).select('name surname');

        // Create chat
        const chatName = name || getChatGroupName(user.id, usersFound) || 'Me, myself and I';

        const chat = new Chat({ name: chatName, users });
        await chat.save();

        res.json({ message: 'Chat created successfully!', chatId: chat._id });
    } catch (error) {
        // If the error is because a user was not found, return a 404 status code.
        if(error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Not all users exists' });
        }
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

/**
 * Edit a chat information. (not including users)
 * Body must contain:
 * - chatId: String
 * - name: String
 * 
 * Body response:
 * - message: String
 * 
 */
const editChat = async (req, res) => {
    try {
        const user = res.locals.user;
        const { chatId, name } = req.body;

        // Find chat
        const chatFound = await Chat.findById(chatId);

        // Check if the user is member of the chat
        if(!chatFound.users.includes(user.id)) {
            return res.status(403).json({ message: 'You are not in the chat' });
        }

        // Edit chat
        chatFound.name = name;
        await chatFound.save();

        res.json({ message: 'Chat edited successfully!' });

    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

/**
 * Add a user to a chat.
 * Body must contain:
 * - chatId: String
 * - userId: String
 * 
 * Body response:
 * - message: String
 * 
 */
const addUserToChat = async (req, res) => {
    try {
        const user = res.locals.user;
        const { chatId, userId } = req.body;

        // Check if the user is not the same
        if(user.id === userId) {
            return res.status(403).json({ message: 'You cannot add yourself' });
        }

        // Find chat
        const chatFound = await Chat.findById(chatId);

        // Check if the calling user is member of the chat
        if(!chatFound.users.includes(user.id)) {
            return res.status(403).json({ message: 'You need to be member of the chat' });
        }

        // Check if the user to add is already member of the chat
        if(chatFound.users.includes(userId)) {
            // I'm a teapot :D
            return res.status(418).json({ message: 'User is already member of the chat' });
        }

        // Add user to chat
        chatFound.users.push(userId);
        await chatFound.save();

        res.json({ message: 'User added successfully!' });

    } catch (error) {
        if(error.kind === 'ObjectId') {
            res.status(404).json({ message: 'Chat not found' });
        }
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

/**
 * Send a message to a chat.
 * Body must contain:
 * - chatId: String
 * - message: String (Chat message)
 * 
 * Body response:
 * - message: String (Response message)
 * 
 */
const sendMessage = async (req, res) => {
    try {
        const user = res.locals.user;
        const { chatId, message } = req.body;

        // Find chat
        const chatFound = await Chat.findById(chatId);

        // Check if the user is in the chat
        if(!chatFound.users.includes(user.id)) {
            return res.status(403).json({ message: 'You are not in the chat' });
        }

        // Check if a message is provided
        if(!message) {
            return res.status(403).json({ message: 'No message provided' });
        }

        // Add message
        const newMessage = new Message({ user: user.id, message, chat: chatId });

        Promise.all([
            newMessage.save(),
            chatFound.updateOne({ $push: { messages: newMessage._id } }),
        ]);

        res.json({ message: 'Message sent!' });

    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

/**
 * Edit a message.
 * Body must contain:
 * - chatId: String
 * - messageId: String
 * - message: String (Chat message)
 * 
 * Body response:
 * - message: String (Response message)
 * 
 */
const editMessage = async (req, res) => {
    try {
        const user = res.locals.user;
        const { chatId, messageId, message } = req.body;

        // Find chat
        const chatFound = await Chat.findById(chatId);

        // Check if the user is in the chat
        if(!chatFound.users.includes(user.id)) {
            return res.status(403).json({ message: 'You are not in the chat' });
        }

        // Check if a message is provided
        if(!message) {
            return res.status(403).json({ message: 'No message provided' });
        }

        // Check if the message exists
        const messageFound = await Message.findById(messageId);

        if(!messageFound) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Check if the message belongs to the chat
        if(messageFound.chat.toString() !== chatId) {
            return res.status(403).json({ message: 'Message does not belong to the chat' });
        }

        // Edit message
        messageFound.message = message;
        await messageFound.save();

        res.json({ message: 'Message edited!' });
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

module.exports = {
    createChat,
    editChat,
    addUserToChat,
    sendMessage,
    editMessage,
};