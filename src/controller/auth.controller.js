const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 2 hours
const TOKEN_EXPIRE = 7200;

const signup = async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        const user = new User({
            name,
            surname,
            email,
            password: await User.encryptPassword(password),
        });

        const newUser = await user.save();
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
            expiresIn: TOKEN_EXPIRE,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong while creating user!' });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
    
        if(!userFound) {
            return res.status(404).json({ message: 'User not found!' });
        }
    
        const matchPassword = await User.comparePassword(password, userFound.password);
    
        if(!matchPassword) {
            res.status(401).json({ token: null, message: 'Invalid password or email!' });
            return;
        }
    
        const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
            expiresIn: TOKEN_EXPIRE,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong while signing in!' });
    }


};

module.exports = {
    signup,
    signin,
};