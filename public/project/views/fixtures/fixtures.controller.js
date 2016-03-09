(function(){

    angular
        .module("Gunners")
        .controller("FixturesController", FixturesController);

    function FixturesController($rootScope, $scope, FixturesService) {
        $scope.fetchFixtures = fetchFixtures;

        function init() {
            fetchFixtures();
        }
        init();

        function fetchFixtures() {
            FixturesService.updateFixtures();
            $scope.fixtures = FixturesService.fixtures;
        }
    }
})();