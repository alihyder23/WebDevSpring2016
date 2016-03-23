(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("MainController", MainController);

    function MainController($rootScope, $location) {
        $rootScope.$location = $location;
        $rootScope.currentUser = null;
    }
})();