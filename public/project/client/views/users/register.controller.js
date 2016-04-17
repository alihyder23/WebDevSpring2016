(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register() {
            $scope.message = null;

            console.log($scope.user.username);

            if ($scope.user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!$scope.user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!$scope.user.password || !$scope.user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if ($scope.user.password != $scope.user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            else {
                $scope.message = null;
                $scope.user.emails = [$scope.user.email];
                delete $scope.user.email;
                delete $scope.user.password2;

                UserService.register($scope.user).then(function(res) {
                    $rootScope.currentUser = res.data;
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();