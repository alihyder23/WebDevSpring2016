(function(){

    angular
        .module("Gunners")
        .controller("TeamController", TeamController);

    function TeamController($rootScope, $scope, TeamService) {

        $scope.players = [];
        $scope.fetchPlayers = fetchPlayers;

        function fetchPlayers() {
            TeamService.fetchPlayers().then(function (response) {
                $scope.players = response;
            });
        }

        fetchPlayers();
    }
})();