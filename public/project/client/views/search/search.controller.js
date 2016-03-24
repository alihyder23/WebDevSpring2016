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
                var string = $rootScope.searchParam;
                var news = [];
                for (var i = 0; i<res.data.length; i++) {
                    if ((res.data[i].title.indexOf(string) > -1) || (res.data[i].content.indexOf(string) > -1) || (res.data[i].author.indexOf(string) > -1)) {
                        news.push(res.data[i]);
                    }
                }
                $scope.results = news;
                console.log(news);

            });
        }
    }
})();