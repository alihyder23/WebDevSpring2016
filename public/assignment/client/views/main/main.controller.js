(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $scope, $location){
        // add location to $rootScope to make it available to all children
        $rootScope.$location = $location;

        // expose a global current user
        $rootScope.currentUser = null;
    }
})();