(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope) {
        $rootScope.searchPage = null;
    }
})();