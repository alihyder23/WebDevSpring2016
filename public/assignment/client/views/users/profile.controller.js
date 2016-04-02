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
            emails: arrayToString($rootScope.currentUser.emails),
            phones: arrayToString($rootScope.currentUser.phones)
        };

        $scope.update = update;

        function update() {

            var newUser = $.extend(true, {}, $scope.newUser);
            newUser.emails = stringToArray(newUser.emails);
            newUser.phones = stringToArray(newUser.phones);

            UserService.updateUser($rootScope.currentUser._id, newUser).then(function(res) {
                UserService.setCurrentUser(res.data);
                $scope.message = "User has been updated!"
            });
        }

        function arrayToString(array) {
            var string = "";
            for(var a in array) {
                var value = array[a];
                string += value;
                if(a < array.length-1) {
                    string += ', ';
                }
            }
            return string;
        }

        function stringToArray(string) {
            var array = [];
            var split = string.split(',');
            for(var s in split) {
                array.push(split[s].trim());
            }
            return array;
        }
    }
})();