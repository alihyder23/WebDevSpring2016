var mock = require("./user.mock.json");

var q = require("q");

module.exports = function() {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function createUser(user) {

        var deferred = q.defer();

        user._id = (new Date()).getTime();
        mock.push(user);
        deferred.resolve(mock);

        return deferred.promise;
    }

    function findAllUsers() {

        var deferred = q.defer();

        deferred.resolve(mock);

        return deferred.promise;
    }

    function findUserById(userId) {

        var deferred = q.defer();

        var user = null;

        for(var u in mock) {
            if (mock[u]._id === userId) {
                user = mock[u];
            }
        }

        deferred.resolve(user);

        return deferred.promise;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();

        var user = null;

        for(var u in mock) {
            if (mock[u].username === username) {
                user = mock[u];
            }
        }

        deferred.resolve(user);

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {

        var deferred = q.defer();

        var user = null;

        for(var u in mock) {
            if (mock[u].username === username &&
                mock[u].password === password) {
                user = mock[u];
            }
        }

        deferred.resolve(user);

        return deferred.promise;
    }

    function updateUser(userId, user) {

        var deferred = q.defer();

        findUserById(userId).then(function(resUser) {
            resUser.firstName = user.firstName;
            resUser.lastName = user.lastName;
            resUser.username = user.username;
            resUser.password = user.password;
            resUser.roles = user.roles;
            resUser.email = user.email;

            deferred.resolve(resUser);
        });

        return deferred.promise;
    }

    function deleteUser(userId) {

        var deferred = q.defer();

        for(var u in mock) {
            if(mock[u]._id === userId) {
                mock.splice(u, 1);
                break;
            }
        }

        deferred.resolve(mock);

        return deferred.promise;

    }

};