const Userdb = require('../model/model');

// create and save new user
create = (req, res) => {
    // validate request
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const { name, surname } = req.body;

    // new user
    const user = new Userdb({
        name,
        surname,
    });

    // save user in the database
    user.save(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating a user',
        });
    });
};

// returns all users or a single user
find = (req, res) => {
    Userdb.find()
    .then(user => {
        res.send(user);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error occurred while retrieving user information',
        });
    });
};

module.exports = {
    create,
    find,
};