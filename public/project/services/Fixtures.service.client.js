(function(){
    'use strict';

    var URL = 'http://api.football-data.org/v1/teams/57/fixtures/';

    angular
        .module("Gunners")
        .factory("FixturesService", FixturesService);

    function FixturesService($rootScope) {
        var model = {
            fixtures: [],
            updateFixtures: updateFixtures
        };
        return model;

        function updateFixtures(){
            $.ajax({
                headers: { 'X-Auth-Token': 'e7d0b480d8e64eb5828355511253d108' },
                url: URL,
                dataType: 'json',
                type: 'GET'
            }).done(function(response) {
                var data = angular.fromJson(response);
                model.fixtures = data.fixtures;
                //console.log(model.fixtures)
            });
        }
    }
})();