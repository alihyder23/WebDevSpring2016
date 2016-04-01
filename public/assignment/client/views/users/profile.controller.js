(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){

        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $scope.newUser = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            emails: arrayToCsv($rootScope.currentUser.emails),
            phones: arrayToCsv($rootScope.currentUser.phones)
        };

        $scope.update = update;

        function update() {

            var newUser = $.extend(true, {}, $scope.newUser);
            newUser.emails = csvToArray(newUser.emails);
            newUser.phones = csvToArray(newUser.phones);

            UserService.updateUser($rootScope.currentUser._id, newUser).then(function(res) {
                UserService.setCurrentUser(res.data);
                $scope.message = "User has been updated!"
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