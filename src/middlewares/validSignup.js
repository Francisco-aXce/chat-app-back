const User = require('../models/User');

/**
 * Check if the user already exists in the database, if so, return a 403 status code.
 * 
 */
const validSignup = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email });

        if(foundUser) {
            return res.status(403).json({ message: 'The user already exists!' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong while creating user!' });
    }
};

module.exports = validSignup;