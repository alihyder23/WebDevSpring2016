(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        if(!$rootScope.loggedIn){
            $scope.$location.url('/login');
        }
        $scope.oldUser = $rootScope.user;
        $scope.updateProfile = function() {
            UserService.updateUser($scope.oldUser._id, $scope.oldUser).then(
                function(response) {
                    $rootScope.user = response.data;
                    $scope.$location.url("/profile");
                },
                function(error) {
                    console.log(error);
                }
            );
        }
    }
})();

