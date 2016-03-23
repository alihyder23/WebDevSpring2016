(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.message = null;
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials({username: user.username, password: user.password}, callback);
            function callback(user){
                if (user) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user, callback);
                    $location.url("/profile");
                }
                else {
                    $scope.message = "Invalid Username or Password"
                }
            }
        }
    }
})();