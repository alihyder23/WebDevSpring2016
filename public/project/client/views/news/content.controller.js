(function() {
    'use strict';

    angular.module("Gunners")
        .controller("ContentController", ContentController);

    function ContentController($rootScope, $routeParams, $scope, NewsService) {

        if (!$rootScope.currentUser) {
            $rootScope.$location.url('/login')
        }

        var newsId = $routeParams.newsId;

        refresh();

        function refresh() {
            NewsService.findNewsById(newsId).then(function(res) {
                $scope.article = res.data;
            });
        }


        $scope.postComment = postComment;

        function postComment() {
            var date = new Date();
            $scope.article.comments.push({
                user: $rootScope.currentUser.username,
                comment: $scope.inputComment,
                date: date
            });

            var updatedArticle = {
                title: $scope.article.title,
                date: $scope.article.date,
                author: $scope.article.author,
                userId: $scope.article.userId,
                content: $scope.article.content,
                comments: $scope.article.comments
            };
            NewsService.updateNewsById(newsId, updatedArticle).then(function(res) {
                refresh();
            });
        }


    }
})();