(function(){
    'use strict';

    angular.module("Gunners")
        .controller("NewsController", NewsController);

    function NewsController($rootScope, $scope, NewsService){
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