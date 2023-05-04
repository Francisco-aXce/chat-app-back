const Userdb = require('../models/User');

// create and save new user
const create = (req, res) => {
    // validate request
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
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating a user',
        });
    });
};

// returns all users or a single user
const find = (req, res) => {

    const { id } = req.query;

    if (id) {
        Userdb.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).send({ message: `Not found user with id ${id}` });
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving user with id ${id}` });
        });
    } else {
        Userdb.find()
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error occurred while retrieving user information',
            });
        });
    }
};

module.exports = {
    create,
    find,
};