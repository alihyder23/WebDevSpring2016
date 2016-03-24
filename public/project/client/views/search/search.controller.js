(function(){
    'use strict';

    angular.module("Gunners")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $scope, NewsService, TeamService, FixturesService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        refresh();

        function refresh() {
            NewsService.findAllNews().then(function(res) {
                $scope.news = res.data;
            });
        }
    }
})();