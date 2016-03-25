(function () {
    'use strict';

    angular
        .module("Gunners")
        .factory("FixturesService", FixturesService);

    function FixturesService($http) {
        var model = {
            fixtures: [],
            fetchFixtures: fetchFixtures
        };
        return model;

        function fetchFixtures() {
            return $http.get('/api/project/fixtures')
                .then(function (response) {
                    var data = angular.fromJson(response.data);
                    model.fixtures = data.fixtures;
                    return model.fixtures;
                });
        }
    }
}());