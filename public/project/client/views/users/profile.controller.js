(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location) {
        $scope.message = null;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updates = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            emails: arrayToCsv($rootScope.currentUser.emails),
            phones: arrayToCsv($rootScope.currentUser.phones)
        };

        $scope.update = update;

        function update() {

            var updates = $.extend(true, {}, $scope.updates);
            updates.emails = csvToArray(updates.emails);
            updates.phones = csvToArray(updates.phones);

            UserService.updateUser($rootScope.currentUser._id, updates).then(function(res) {
                UserService.setCurrentUser(res.data);
                $scope.message = "User updated successfully"
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
})();