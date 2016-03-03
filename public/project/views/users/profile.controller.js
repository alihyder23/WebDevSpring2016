(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {
        $scope.message = null;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = updateUser;

        function updateUser (user) {
            $scope.message = null;
            UserService.updateUser($scope.currentUser._id, user, callback);
            function callback(user){
                if (user) {
                    $scope.message = "User updated successfully";
                    UserService.setCurrentUser(user);
                } else {
                    $scope.message = "Unable to update the user";
                }
            }
        }
    }
})();