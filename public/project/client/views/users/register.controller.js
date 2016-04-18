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
                $scope.user.roles = csvToArray($scope.user.role);
                delete $scope.user.email;
                delete $scope.user.password2;

                UserService.register($scope.user).then(function(res) {
                    $rootScope.currentUser = res.data;
                    $rootScope.$location.url('/profile');
                });
            }

            function arrayToCsv(array) {
                var csv = "";
                for(var a in array) {
                    var value = array[a];
                    csv += value;
                    if(a < array.length-1) {
                        csv += ', ';
                    }
                }
                return csv;
            }

            function csvToArray(csv) {
                var array = [];
                var split = csv.split(',');
                for(var s in split) {
                    array.push(split[s].trim());
                }
                return array;
            }
        }
    }
})();