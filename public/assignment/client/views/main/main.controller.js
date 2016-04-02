(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $scope, $location){
        $rootScope.$location = $location;

        $rootScope.currentUser = null;
    }
})();