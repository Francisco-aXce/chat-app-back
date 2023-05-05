
/**
 * Enforces that the request body is not empty.
 * 
 */
const bodyCheck = (req, res, next) => {
    if(!req.body || Object.keys(req.body) < 1) {
        res.status(400).json({ message: 'Content can not be empty!' });
        return;
    }
    next();
};

module.exports = bodyCheck;