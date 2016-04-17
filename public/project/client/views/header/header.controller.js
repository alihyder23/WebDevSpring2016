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
            UserService.logout().then(function(res) {
                UserService.setCurrentUser(null);
                $rootScope.$location.url('/home');
            });
        }
        function search() {
            $rootScope.searchParam = $scope.searchParam;
            $scope.searchParam = null;
            $route.reload();
            $location.url("/search");

        }
    }
})();