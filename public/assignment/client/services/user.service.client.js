(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
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
            return $http.get('/api/assignment/user?username='+username+'&password='+password);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }

        function createUser (user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/'+userId);
        }

        function updateUser (userId, updates) {
            return $http.put('/api/assignment/user/'+userId, updates);
        }

        function findUserById (id) {
            return $http.get('/api/assignment/user/'+id);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username='+username);
        }

    }
})();