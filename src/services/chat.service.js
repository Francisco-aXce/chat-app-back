/**
 * Joins users names to create a chat group name (ignoring the current user name).
 * @param {string} userId Current user id.
 * @param {*} chatUsers Users in the chat.
 * @returns {string} Chat group name.
 */
const getChatGroupName = (userId, chatUsers) => {
    const name = chatUsers.filter(user => user._id.toString() !== userId.toString()).map(user => user.name).join(', ');
    return name;
}

module.exports = { 
    getChatGroupName,
};