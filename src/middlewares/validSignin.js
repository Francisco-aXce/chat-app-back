const User = require('../models/User');

/**
 * Check if the user exists in the database, if not, return a 404 status code.
 * 
 */
const validSignin = async (req, res, next) => {
    try {
        const foundUser = User.findOne({ email: req.body.email });

        if(!foundUser) {
            return res.status(404).json({ message: 'The user does not exists!' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong!' });
    }
};

module.exports = validSignin;