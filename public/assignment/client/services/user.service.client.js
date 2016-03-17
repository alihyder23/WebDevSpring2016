(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http, $q) {
        var service = {
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
        return service;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser (user) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user/", user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" +userId+"/").success(function(response){
                if (response.ok == 1) {
                    $http.get("/api/assignment/user").success(function (users) {
                        deferred.resolve(users);
                    });
                }
            });
            return deferred.promise;
        }

        function updateUser (userId, currentUser) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + userId +"/", currentUser).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findUserById (id) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+id+"/").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

    }
})();