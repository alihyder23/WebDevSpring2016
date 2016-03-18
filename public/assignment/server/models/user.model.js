var mock = require("./user.mock.json");
var q = require("q");

module.exports = function() {
    "use strict";
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

        user._id = (new Date).getTime();
        mock.push(user);
        deferred.resolve(user);
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        deferred.resolve(mock);
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i]._id === userId) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i].username === username) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i].username === credentials.username &&
                mock[i].password === credentials.password) {
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        for (var i in mock) {
            if (mock[i]._id === userId) {
                mock[i] = user;
                deferred.resolve(mock[i]);
                return deferred.promise;
            }
        }
        return null;
    }

    function deleteUser(userId) {
        var newUsers = [];
        for (var i in mock) {
            if (mock[i]._id !== userId) {
                newUsers.push(mock[i]);
            }
        }
        mock = newUsers;
    }
};