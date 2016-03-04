(function(){

    angular
        .module("Gunners")
        .controller("TeamController", TeamController);

    function TeamController($rootScope, $scope, TeamService) {
        $scope.fetchPlayers = fetchPlayers;

        function init() {
            fetchPlayers();
        }
        init();

        function fetchPlayers() {
            TeamService.updatePlayers()
            $scope.players = TeamService.players;
        }
    }
})();