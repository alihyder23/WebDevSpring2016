(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope) {
        if(!$rootScope.loggedIn){
            $scope.$location.url('/login');
        }
    }
})();

