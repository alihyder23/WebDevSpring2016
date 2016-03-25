(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService, $rootScope, $route) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.search = search;
        $scope.searchParam = $rootScope.searchParam;


        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
        function search() {
            $rootScope.searchParam = $scope.searchParam;
            $scope.searchParam = null;
            $route.reload();
            $location.url("/search");

        }
    }
})();