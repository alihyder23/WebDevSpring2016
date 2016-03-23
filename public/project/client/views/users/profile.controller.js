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
            email: $rootScope.currentUser.email
        };

        $scope.update = update;

        function update() {
            UserService.updateUser($rootScope.currentUser._id, $scope.updates).then(function(res) {
                UserService.setCurrentUser(res.data);
                $scope.message = "User updated successfully"
            });
        }
    }
})();