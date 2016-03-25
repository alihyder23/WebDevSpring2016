(function(){

    angular
        .module("Gunners")
        .controller("TeamController", TeamController);

    function TeamController($rootScope, $scope, TeamService) {

        $scope.players = [];
        $scope.fetchPlayers = fetchPlayers;

        function fetchPlayers() {
            TeamService.getPlayers().then(function (response) {
                $scope.players = response.data;
            });
        }

        fetchPlayers();
    }
})();