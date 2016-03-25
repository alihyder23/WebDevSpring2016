(function () {
    'use strict';

    angular
        .module("Gunners")
        .factory("TeamService", TeamService);

    function TeamService($http) {
        var model = {
            fetchPlayers: fetchPlayers,
            searchPlayers: searchPlayers,
            getPlayers: getPlayers
        };
        return model;

        function fetchPlayers() {
            return $http.get('/api/project/team')
        }

        function searchPlayers (string) {
            return $http.get('/api/project/team/search/'+string);
        }

        function getPlayers () {
            return $http.get('/api/project/players');
        }
    }
}());