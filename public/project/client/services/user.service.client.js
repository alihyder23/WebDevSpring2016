(function(){
    'use strict';

    angular
        .module("Gunners")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var model = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/project/user?username='+username+'&password='+password);
        }

        function findAllUsers() {
            return $http.get('/api/project/user');
        }

        function createUser (user) {
            return $http.post('/api/project/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/user/'+userId);
        }

        function updateUser (userId, updates) {
            return $http.put('/api/project/user/'+userId, updates);
        }

        function findUserById (id) {
            return $http.get('/api/project/user/'+id);
        }

        function findUserByUsername(username) {
            return $http.get('/api/project/user?username='+username);
        }

    }
})();