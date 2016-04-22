(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, UserService, $location, $rootScope) {
        $scope.message = null;
        $scope.login = login;

        function login (user) {
            UserService.login(user).then(function(res) {
                if(res.data) {
                    UserService.setCurrentUser(res.data);
                    $rootScope.$location.url('/profile');
                } else {
                    $scope.error = "Invalid Username or Password"
                }
            });
        }
    }
})();