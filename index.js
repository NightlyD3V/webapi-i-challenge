// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

//CRUD operations

//Create new users 
server.post('/api/users', (req, res)=> {
    const newUser = req.body;
    db.insert(newUser)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                err: err,
                message: 'Failed to add new user'
            })
        })
})
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
                message: 'failed to find users'
            })
        })
})

server.listen(6000, ()=> {
    console.log('server is listening on port 6000');
});