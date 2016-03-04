(function(){
    'use strict';

    angular.module("Gunners")
        .controller("TeamController", TeamController);

    function TeamController($rootScope, $scope, TeamService){
        $scope.players = TeamService.players;
    }
})();