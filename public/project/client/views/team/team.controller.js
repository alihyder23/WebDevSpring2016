
(function(){

    angular
        .module("Gunners")
        .controller("TeamController", TeamController);

    function TeamController($rootScope, $scope, TeamService) {
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $scope.fetchPlayers = fetchPlayers;

        function fetchPlayers() {
            TeamService.updatePlayers();
            $scope.players = TeamService.players;
        }

        fetchPlayers();
    }
})();