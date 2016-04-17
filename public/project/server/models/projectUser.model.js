var q = require("q");


module.exports = function(db, mongoose) {

    var ProjectUserSchema = require('./projectUser.schema.js')(mongoose);
    var ProjectUserModel = mongoose.model('ProjectUser', ProjectUserSchema);

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

        console.log(user);

        ProjectUserModel.create(user, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {

        var deferred = q.defer();

        ProjectUserModel.find({}, function(err, users) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {

        var deferred = q.defer();

        ProjectUserModel.findById(userId, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();

        ProjectUserModel.findOne({
            username: username
        }, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {

        var deferred = q.defer();

        ProjectUserModel.findOne({
            username: username,
            password: password
        }, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {

        var deferred = q.defer();

        ProjectUserModel.update({ _id: userId }, user, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                findUserById(userId).then(function(user) {
                    deferred.resolve(user);
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {

        var deferred = q.defer();

        ProjectUserModel.remove({ _id: userId }, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;

    }

};