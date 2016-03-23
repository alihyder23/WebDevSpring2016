(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.message = null;
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(res) {
                var user = res.data;
                if (user) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $rootScope.$location.url("/profile");
                } else {
                    $scope.message = "Invalid Username or Password"
                }
            });
        }
    }
})();