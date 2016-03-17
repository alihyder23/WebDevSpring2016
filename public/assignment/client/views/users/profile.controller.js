(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location) {
        $scope.message = null;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.updateUser = updateUser;

        function updateUser (user) {
            $scope.message = null;
            UserService.updateUser($scope.currentUser._id, $scope.updates).then(function(res) {
                UserService.setCurrentUser(res.data);
                if (res.data) {
                    $scope.message = "User updated successfully";
                    UserService.setCurrentUser(res.data);
                } else {
                    $scope.message = "Unable to update the user";
                }
            });
        }
    }
})();