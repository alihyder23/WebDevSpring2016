(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location, $rootScope) {
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

        $scope.updateUser = updateUser;

        function updateUser (user) {
            $scope.message = null;
            UserService.updateUser($scope.currentUser._id, $scope.updates).then(function(res) {
                if (res) {
                    $scope.message = "User updated successfully";
                    UserService.setCurrentUser(res);
                } else {
                    $scope.message = "Unable to update the user";
                }
            });
        }
    }
})();