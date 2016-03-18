var mock = require("./user.mock.json");

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
        user._id = (new Date).getTime();

        mock.push(user);
        return user;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for (var i in mock) {
            if (mock[i]._id === userId) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var i in mock) {
            if (mock[i].username === username) {
                return mock[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i in mock) {
            if (mock[i].username === credentials.username &&
                mock[i].password === credentials.password) {
                return mock[i];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        for (var i in mock) {
            if (mock[i]._id === userId) {
                mock[i] = user;
                return mock[i];
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