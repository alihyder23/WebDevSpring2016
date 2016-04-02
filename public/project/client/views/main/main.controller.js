(function(){
    'use strict';

    angular
        .module("Gunners")
        .controller("MainController", MainController);

    function MainController($rootScope, $location, TeamService, FixturesService) {
        $rootScope.$location = $location;
        $rootScope.currentUser = null;

        TeamService.fetchPlayers();
        FixturesService.fetchFixtures();

    }
})();