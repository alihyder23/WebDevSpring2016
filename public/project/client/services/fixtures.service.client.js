(function () {
    'use strict';

    angular
        .module("Gunners")
        .factory("FixturesService", FixturesService);

    function FixturesService($http) {
        var model = {
            fetchFixtures: fetchFixtures,
            searchFixtures: searchFixtures,
            getFixtures: getFixtures
        };
        return model;

        function fetchFixtures() {
            return $http.get('/api/project/fixtures');
        }

        function searchFixtures (string) {
            return $http.get('/api/project/fixtures/search/'+string);
        }

        function getFixtures () {
            return $http.get('/api/project/matches');
        }
    }
}());