const User = require('../models/User');
const { Chat, Message } = require('../models/Chat');


/**
 * Get a chat by userId.
 * 
 * Params:
 * - userId: String (user id who chat is for)
 * 
 * Returns:
 * - chat: Object
 * 
 */
const getChat = async (req, res) => {
    try {
        const user = res.locals.user;
        const { userId } = req.params;

        // Check if all params are provided
        if(!userId) {
            return res.status(400).json({ message: 'Missing data' });
        }

        // Check if is the same user
        const isSameUser = user.id === userId;

        // Check if the user exists
        const userFound = await User.findById(userId).select('name surname')
        .catch(err => {
            if(err.kind === 'ObjectId') return undefined;
            throw err;
        });
        if(!userFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find chat
        let chat = isSameUser ? await Chat.findOne({ users: { $all: [user.id], $size: 1 } }) 
        : await Chat.findOne({ users: { $all: [user.id, userId], $size: 2 } })
        .catch(err => {
            if(err.kind === 'ObjectId') return undefined;
            throw err;
        });

        if(!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Populate users and messages
        chat = await chat.populate([
            { path: 'users', select: 'name surname' },
            { path: 'messages' },
        ]);

        res.json({ chat });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

/**
 * Send a message to someone.
 * Body must contain:
 * - to: String (User id)
 * - message: String (Chat message)
 * 
 * Body response:
 * - message: String (Response message)
 * 
 */
const sendMessage = async (req, res) => {
    try {
        const user = res.locals.user;
        const { to, message } = req.body;

        // Check if necessary fields are provided
        if(!to || !message) {
            return res.status(400).json({ message: 'Missing data' });
        }

        // Check if the "to" user exists
        await User.findById(to)
        .catch((err) => {
            // If the user doesn't exist, return a 404 status code
            if(err.kind === 'ObjectId') {
                return res.status(404).json({ message: 'User not found' });
            }
            // If the error is different, throw it
            throw err;
        });

        // Find chat, if it doesn't exist, create it
        let chatFound = await Chat.findOne({ users: { $all: [user.id, to], $size: 2 } });
        if(!chatFound) {
            chatFound = new Chat({
                users: [user.id, to],
            });
            await chatFound.save();
        }

        // Create the message
        const newMessage = new Message({
            author: user.id,
            message,
            chatType: 'Chat', // Is a private chat
            chat: chatFound._id,
        });

        // Save the message and update the chat
        await Promise.all([
            newMessage.save(),
            chatFound.updateOne({ $push: { messages: newMessage._id } }),
        ]);

        res.json({ message: 'Message sent!' });

    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

/**
 * Removes a message from a chat.
 * Body must contain:
 * - chatId: String
 * - messageId: String
 * 
 * Body response:
 * - message: String (Response message)
 * 
 */
const removeMessage = async (req, res) => {
    try {
        const user = res.locals.user;
        const { chatId, messageId } = req.body;

        // Check if necessary fields are provided
        if(!chatId || !messageId) {
            return res.status(400).json({ message: 'Missing data' });
        }

        // Check if the chat exists
        const chatFound = await Chat.findById(chatId)
        .catch((err) => {
            if(err.kind === 'ObjectId') return undefined;
            throw err;
        });
        if(!chatFound) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Check if the user is a member of the chat
        const isMember = chatFound.users.includes(user.id);
        if(!isMember) {
            return res.status(403).json({ message: 'Action not allowed' });
        }

        // Check if the message exists
        const messageFound = await Message.findById(messageId)
        .catch((err) => {
            if(err.kind === 'ObjectId') return undefined;
            throw err;
        });
        if(!messageFound) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Check if the message is from the chat
        const isFromChat = messageFound.chat.toString() === chatFound._id.toString();
        if(!isFromChat) {
            return res.status(403).json({ message: 'Action not allowed' });
        }

        // Remove the message
        chatFound.messages = chatFound.messages.filter(message => message.toString() !== messageId);
        await Promise.all([
            chatFound.save(),
            messageFound.deleteOne(),
        ]);

        res.json({ message: 'Message removed' });


    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

module.exports = {
    getChat,
    sendMessage,
    removeMessage,
};