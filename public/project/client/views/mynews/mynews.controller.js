(function(){
    'use strict';

    angular.module("Gunners")
        .controller("MyNewsController", MyNewsController);

    function MyNewsController($rootScope, $scope, NewsService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        refresh();

        $scope.addNews = addNews;
        $scope.updateNews = updateNews;
        $scope.deleteNews = deleteNews;
        $scope.selectNews = selectNews;

        function addNews() {
            var author =  $rootScope.currentUser.firstName + " " + $rootScope.currentUser.lastName;
            var date = new Date();
            NewsService.createNewsForUser($rootScope.currentUser._id, { title: $scope.newsTitle, content: $scope.newsContent, author: author, date: stringDate }).then(function(res) {
                $scope.newsTitle = null;
                $scope.newsContent = null;
                $scope.news = res.data;
            });
        }

        function updateNews() {
            $scope.selectedNews.title = $scope.newsTitle;
            NewsService.updateNewsById($scope.selectedNews._id, $scope.selectedNews).then(function(res) {
                $scope.selectedNews = null;
                $scope.newsTitle = null;
                refresh();
            });

        }

        function deleteNews(index) {
            NewsService.deleteNewsById($scope.news[index]._id).then(function(res) {
                $scope.news = res.data;
            })
        }

        function selectNews(index) {
            $scope.selectedNews = $.extend(true, {}, $scope.news[index]);
            $scope.newsTitle = $scope.selectedNews.title;
        }

        function refresh() {
            NewsService.findAllNewsForUser($rootScope.currentUser._id).then(function(res) {
                $scope.news = res.data;
            });
        }
    }
})();