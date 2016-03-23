module.exports = function(app, projectUserModel) {

    app.post('/api/project/user', createUser);
    app.get('/api/project/user', findUser);
    app.get('/api/project/user/:id', findUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    function createUser(req, res) {

        var user = req.body;

        projectUserModel.createUser(user).then(function(users) {
            res.json(users);
        });

    }

    function findUser(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {

            projectUserModel.findUserByCredentials(username, password).then(function(user) {
                res.json(user);
            });

        } else if (username) {

            projectUserModel.findUserByUsername(username).then(function(user) {
                res.json(user);
            });

        } else {

            projectUserModel.findAllUsers().then(function(users) {
                res.json(users);
            });

        }

    }

    function findUserById(req, res) {

        var userId = parseInt(req.params.id);

        projectUserModel.findUserById(userId).then(function(user) {
            res.json(user);
        });

    }

    function updateUser(req, res) {

        var userId = parseInt(req.params.id);
        var user = req.body;

        projectUserModel.updateUser(userId, user).then(function(updatedUser) {
            res.json(updatedUser);
        });

    }

    function deleteUser(req, res) {

        var userId = parseInt(req.params.id);

        projectUserModel.deleteUser(userId).then(function(users) {
            res.json(users);
        })

    }

};