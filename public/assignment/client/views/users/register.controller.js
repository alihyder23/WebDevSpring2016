(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, UserService){
        $scope.register = register;

        function register() {
            if($scope.user.password !== $scope.user.verifyPassword){
                $scope.passwordConflict = "Passwords Must Match!";
                return;
            }
            else {
                $scope.passwordConflict = null;

                UserService.createUser($scope.user).then(function(res) {
                    $rootScope.currentUser = res.data;
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();