// implement your API here

//Globals
const express = require('express');
const db = require('./data/db');
const server = express();

//Middleware
server.use(express.json());

//CRUD operations

//Create new user
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
            });
        });
});

//Get array of all users
server.get('/api/users', (req, res) => {
    db.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                err: err,
                message: 'Failed to find users'
            });
        });
});

//Get user with specific ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                err: err,
                message: `Failed to find user with that ID: ${id}`
            });
        });
});

//Delete user with specific ID
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then((deletedUser) => {
        res.json(deletedUser);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            err: err,
            message: `Failed to delete/find user with ID: ${id}`
        });
    });
});

//Update user with specific ID
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updateInfo = req.body;
    db.update(id, updateInfo)
    .then((updated) => {
        if(updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                err: err,
                message: `Failed to update/find user with ID: ${id}`
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            err: err,
            message: `Failed to update/find user with ID: ${id}`
        });
    });
});

server.listen(6000, () => {
    console.log('server is listening on port 6000');
});