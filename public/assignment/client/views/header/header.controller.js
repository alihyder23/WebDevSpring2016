(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, UserService){
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $rootScope.$location.url("/home");
        }
    }
})();