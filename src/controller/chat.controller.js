const User = require('../models/User');
const { Chat } = require('../models/Chat');
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
        res.status(500).json({ message: error.message || 'Something went wrong!' });
    }
};

module.exports = { createChat };