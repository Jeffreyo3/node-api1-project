// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.listen(4000, () => {
    console.log('**** listening on port 4000');
});

// global middleware
server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world!');
})

server.get('/data', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.post('/data/', (req, res) => {
    const dataInfo = req.body;

    db.add(dataInfo)
        .then(data => {
            res.status(201).json({ success: true, data })
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        })
})