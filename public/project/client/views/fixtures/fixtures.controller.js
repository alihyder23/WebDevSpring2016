(function(){

    angular
        .module("Gunners")
        .controller("FixturesController", FixturesController);

    function FixturesController($rootScope, $scope, FixturesService) {

        $scope.fixtures = [];
        $scope.fetchFixtures = fetchFixtures;

        function fetchFixtures() {
            FixturesService.getFixtures().then(function (response) {
                $scope.fixtures = response.data;
            });
        }

        fetchFixtures();
    }
})();