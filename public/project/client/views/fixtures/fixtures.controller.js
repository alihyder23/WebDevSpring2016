(function(){

    angular
        .module("Gunners")
        .controller("FixturesController", FixturesController);

    function FixturesController($rootScope, $scope, FixturesService) {

        $scope.fixtures = [];
        $scope.fetchFixtures = fetchFixtures;

        function fetchFixtures() {
            FixturesService.fetchFixtures().then(function (response) {
                $scope.fixtures = response;
            });
        }

        fetchFixtures();
    }
})();