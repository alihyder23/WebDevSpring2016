(function(){
    angular
        .module("Gunners")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {	"_id":123, "firstName":"Ali",            "lastName":"Hyder",
                    "username":"Prince Ali",  "password":"hyder",   "email":"ali@me.com",   "roles": ["admin, fan, news"]		},
                {	"_id":234, "firstName":"Mesut",              "lastName":"Ozil",
                    "username":"M10",    "password":"yagunnersya",     "roles": ["fan , news"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["news"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["fan"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["fan"]		}
            ],
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser (callback) {
            callback($rootScope.currentUser);
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(credentials, callback) {
            for (var u in model.users) {
                if (model.users[u].username === credentials.username &&
                    model.users[u].password === credentials.password) {
                    callback(model.users[u]);
                }
            }
            callback(null);
        }

        function findAllUsers(callback) {
            callback(model.users);
        }

        function createUser (user, callback) {
            var user = {
                username: user.username,
                password: user.password,
                email: user.email,
                _id: (new Date).getTime()
            };
            model.users.push(user);
            console.info(model.users)
            callback(user);
        }

        function deleteUserById(userId) {
            var index = $scope.users.indexOf(userId);
            $scope.users.splice(index, 1);
        }

        function updateUser (userId, currentUser, callback) {
            var user = model.findUserById(userId);
            if (user != null) {
                user.username = currentUser.username;
                user.password = currentUser.password;
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.email = currentUser.email;
                callback(user);
            } else {
                callback(null);
            }
        }

        function findUserById (id) {
            for (var u in model.users) {
                if (model.users[u]._id === id) {
                    return model.users[u];
                }
            }
            return null;
        }

    }
})();