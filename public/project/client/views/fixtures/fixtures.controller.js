(function(){

    angular
        .module("Gunners")
        .controller("FixturesController", FixturesController);

    function FixturesController($rootScope, $scope, FixturesService) {
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $rootScope.searchPage = null;

        $scope.fetchFixtures = fetchFixtures;

        function fetchFixtures() {
            FixturesService.updateFixtures();
            $scope.fixtures = FixturesService.fixtures;
        }

        fetchFixtures();
    }
})();