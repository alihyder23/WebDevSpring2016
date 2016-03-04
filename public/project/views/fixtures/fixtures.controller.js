(function(){

    angular
        .module("Gunners")
        .controller("FixturesController", FixturesController);

    function FixturesController($rootScope, $scope, FixturesService) {
        $scope.fetchPlayers = fetchFixtures

        function init() {
            fetchFixtures();
        }
        init();

        function fetchFixtures() {
            FixturesService.updateFixtures()
            $scope.fixtures = FixturesService.fixtures;
        }
    }
})();