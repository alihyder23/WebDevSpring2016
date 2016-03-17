(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $rootScope, $location) {
        $scope.message = null;
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(res) {
                if (res) {
                    $rootScope.currentUser = res;
                    UserService.setCurrentUser(res);
                    $location.url("/profile");
                }
                else {
                    $scope.message = "Invalid Username or Password"
                }
            });
        }
    }
})();