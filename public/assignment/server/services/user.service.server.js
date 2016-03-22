module.exports = function(app, UserModel) {
    "use strict";

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findUsers);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function createUser(req, res) {
        UserModel.createUser(req.body).then(function(response) {
            res.json(response);
        });
    }

    function findUsers(req, res) {
        if (req.query.username) {
            if (req.query.password) {
                findUserByCredentials(req, res);
            } else {
                findUserByUsername(req, res);
            }
        } else {
            UserModel.findAllUsers().then(function(response) {
                res.json(response);
            });
        }
    }

    function findUserById(req, res) {
        var userId = parseInt(req.params.id);
        UserModel.findUserById(userId).then(function(response) {
            res.json(response);
        });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        UserModel.findUserByUsername(username).then(function(response) {
            res.json(response);
        });
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        UserModel.findUserByCredentials(credentials).then(function(response) {
            res.json(response);
        });
    }

    function updateUser(req, res) {
        var userId = parseInt(req.params.id);
        UserModel.updateUser(userId, req.body).then(function(response) {
            res.json(response);
        });
    }

    function deleteUser(req, res) {
        var userId = parseInt(req.params.id);
        UserModel.deleteUser(userId);
        res.send(200);f
    }
};