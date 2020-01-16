// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.listen(4000, () => {
    console.log('**** listening on port 4000');
});

// global middleware
server.use(express.json());

// server.get('/', (req, res) => {
//     res.send('hello world!');
// })

// .find()
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ success: false, err, errorMessage: "The users information could not be retrieved." });
        });
});

// .findById() takes in  id & if no id, returns empty array
server.get('/api/users/:id', (req, res) => {

    const { id } = req.params;


    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ succes: false, err, errorMessage: "The user information could not be retrieved." });
        });
});

// .insert() passes user, add object to db, return obj w/ id
server.post('/api/users', (req, res) => {

    const newUser = req.body;

    if (!newUser.hasOwnProperty('name')) {
        res.status(400).json({ errorMessage: "Please provide name for the user" })
    }
    if (!newUser.hasOwnProperty('bio')) {
        res.status(400).json({ errorMessage: "Please provide bio for the user" })
    }

    db.insert(newUser)
        .then(user => {
            const addUser = { ...newUser, id: user.id }
            res.status(201).json({ success: true, addUser })
        })
        .catch(err => {
            res.status(500).json({ success: false, err, errorMessage: "There was an error while saving the user to the database" })
        })

})

// .update() accepts 2 arguments: id & changes. Returns count of updated records
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changeUser = req.body;

    if (!changeUser.hasOwnProperty('name')) {
        res.status(400).json({ errorMessage: "Please include name for the user" })
    }
    if (!changeUser.hasOwnProperty('bio')) {
        res.status(400).json({ errorMessage: "Please include bio for the user" })
    }

    db.update(id, changeUser)
        .then(update => {
            if (update) {
                res.status(201).json({ success: true, changeUser, update })
            } else {
                res.status(404).json({ success: false, message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err, errorMessage: "The user information could not be modified." })
        })

})

// .remove() accepts id. on success, returns number of records deleted
server.delete('/api/users/:id', (req, res) => {

})