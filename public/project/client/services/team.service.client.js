(function(){
    'use strict';

    var URL = 'http://api.football-data.org/v1/teams/57/players';

    angular
        .module("Gunners")
        .factory("TeamService", TeamService);

    function TeamService($rootScope) {
        var model = {
            players: [],
            updatePlayers: updatePlayers
        };
        return model;

        function updatePlayers(){
            $.ajax({
                headers: { 'X-Auth-Token': 'e7d0b480d8e64eb5828355511253d108' },
                url: URL,
                dataType: 'json',
                type: 'GET',
            }).done(function(response) {
                var data = angular.fromJson(response)
                model.players = data.players;
                //console.log(model.players)
            });
        }
    }
})();