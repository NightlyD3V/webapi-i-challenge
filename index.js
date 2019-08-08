// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db.js');

//CRUD operations

//Get array of all users
server.get('/api/users', (req, res) => {
    db.find()
        .then((users)=> {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                err: err,
            })
        })
})

server.listen(6000, ()=> {
    console.log('server is listening on port 6000');
});