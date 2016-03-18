(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("AdminController", AdminController);

    function AdminController($rootScope) {
        if(!$rootScope.loggedIn){
            $scope.$location.url('/login');
        }
    }
})();

