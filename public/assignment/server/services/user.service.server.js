var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', findUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

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

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

};