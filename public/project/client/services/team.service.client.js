(function () {
    'use strict';

    angular
        .module("Gunners")
        .factory("TeamService", TeamService);

    function TeamService($http) {
        var model = {
            players: [],
            fetchPlayers: fetchPlayers
        };
        return model;

        function fetchPlayers() {
            return $http.get('/api/project/team')
                .then(function (response) {
                    var data = angular.fromJson(response.data);
                    model.players = data.players;
                    return model.players;
                });
        }
    }
}());