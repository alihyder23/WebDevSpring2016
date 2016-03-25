(function(){
    'use strict';

    angular.module("Gunners")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $scope, NewsService, TeamService, FixturesService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $rootScope.searchPage = 1;

        refresh();

        $scope.search = search;

        function refresh() {
            NewsService.searchNews($rootScope.searchParam.toLowerCase()).then(function(res) {
                $scope.newsResults = res.data;
            });
            TeamService.searchPlayers($rootScope.searchParam.toLowerCase()).then(function(res) {
                $scope.playersResults = res.data;
            });
            FixturesService.searchFixtures($rootScope.searchParam.toLowerCase()).then(function(res) {
                $scope.fixturesResults = res.data;
            });
        }

        function search() {
            $rootScope.searchParam = $scope.searchParam;
            refresh();
        }
    }
})();