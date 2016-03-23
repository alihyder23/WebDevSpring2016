(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, UserService){
        $scope.register = register;

        function register() {
            if($scope.user.password !== $scope.user.verifyPassword){
                $scope.passwordConflict = "Verification conflict: passwords must match.";
                return;
            }
            else {
                $scope.passwordConflict = null;

                UserService.createUser($scope.user).then(function(res) {
                    $rootScope.currentUser = res.data[res.data.length-1];
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();