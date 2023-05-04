const pkg = require('../../package.json');

const info = (req, res, next) => {
    res.apiInfo = {
        name: pkg.name,
        author: pkg.author,
        version: pkg.version,
        description: pkg.description,
    };
    next();
};

module.exports = {
    info,
};