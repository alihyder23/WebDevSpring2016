(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();