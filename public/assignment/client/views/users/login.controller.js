(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {

        $scope.login = function() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(
                function(response) {
                    var user = response.data;
                    if (user === null) {
                        $scope.error = "Invalid Username or Password";
                    } else {
                        $rootScope.loggedIn = true;
                        $rootScope.user = user;
                        for (var i in user.roles) {
                            if (user.roles[i] === "admin") {
                                $rootScope.isAdmin = true;
                            }
                        }
                        $scope.$location.url("/profile");
                    }
                }
            );

        };

    }
})();

