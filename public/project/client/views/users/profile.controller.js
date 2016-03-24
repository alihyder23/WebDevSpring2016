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

        $rootScope.searchPage = null;

        $scope.update = update;

        function update(user) {
            console.log(user);
            UserService.updateUser($rootScope.currentUser._id, user).then(function(res) {
                UserService.setCurrentUser(res.data);
                $scope.message = "User updated successfully"
            });
        }
    }
})();