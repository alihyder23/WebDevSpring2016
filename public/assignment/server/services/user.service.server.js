module.exports = function(app, userModel) {

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function createUser(req, res) {

        var user = req.body;

        userModel.createUser(user).then(function(users) {
            res.json(users);
        });

    }

    function findUser(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {

            userModel.findUserByCredentials(username, password).then(function(user) {
                res.json(user);
            });

        } else if (username) {

            userModel.findUserByUsername(username).then(function(user) {
                res.json(user);
            });

        } else {

            userModel.findAllUsers().then(function(users) {
                res.json(users);
            });

        }

    }

    function findUserById(req, res) {

        var userId = req.params.id;

        userModel.findUserById(userId).then(function(user) {
            res.json(user);
        });

    }

    function updateUser(req, res) {

        var userId = req.params.id;
        var user = req.body;

        userModel.updateUser(userId, user).then(function(updatedUser) {
            res.json(updatedUser);
        });

    }

    function deleteUser(req, res) {

        var userId = req.params.id;

        userModel.deleteUser(userId).then(function(users) {
            res.json(users);
        })

    }

};