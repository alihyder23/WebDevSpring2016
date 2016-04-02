(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, UserService){
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(res) {
                var user = res.data;
                if (user) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $rootScope.$location.url("/profile");
                } else {
                    $scope.error = "Invalid Credentials!"
                }
            });
        }
    }
})();