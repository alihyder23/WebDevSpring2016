(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope) {
        if(!$rootScope.isAdmin){
            $scope.$location.url('/home');
        }
    }
})();

