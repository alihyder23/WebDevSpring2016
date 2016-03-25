(function(){
    'use strict';

    angular
        .module("Gunners")
        .factory("NewsService", NewsService);

    function NewsService($rootScope, $http) {
        var model = {
            createNewsForUser: createNewsForUser,
            findAllNewsForUser: findAllNewsForUser,
            deleteNewsById: deleteNewsById,
            updateNewsById: updateNewsById,
            findAllNews: findAllNews,
            searchNews: searchNews
        };
        return model;

        function createNewsForUser(userId, news){
            return $http.post('/api/project/user/'+userId+'/news', news);
        }

        function findAllNewsForUser(userId) {
            return $http.get('/api/project/user/'+userId+'/news');
        }

        function deleteNewsById(newsId) {
            return $http.delete('/api/project/news/'+newsId);
        }

        function updateNewsById(newsId, newNews) {
            return $http.put('/api/project/news/'+newsId, newNews);
        }

        function findAllNews() {
            return $http.get('/api/project/news');
        }
        function searchNews (string) {
            return $http.get('/api/project/news/search/'+string);
        }
    }
})();