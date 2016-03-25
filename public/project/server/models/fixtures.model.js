var mock = require("./fixtures.mock.json");
// load q promise library
var q = require("q");


module.exports = function() {

    var api = {
        updateFixtures: updateFixtures,
        searchFixtures: searchFixtures,
        getFixtures: getFixtures
    };

    return api;

    function updateFixtures(fixtures) {
        mock = fixtures;
    }

    function getFixtures() {
        var deferred = q.defer();

        deferred.resolve(mock);

        return deferred.promise;
    }

    function searchFixtures(string) {

        var deferred = q.defer();

        var fixtures = [];

        for (var i in mock) {
            if ((mock[i].date.toLowerCase().indexOf(string) > -1) || (mock[i].status.toLowerCase().indexOf(string) > -1)
                || (mock[i].homeTeamName.toLowerCase().indexOf(string) > -1) || (mock[i].awayTeamName.toLowerCase().indexOf(string) > -1)) {
                fixtures.push(mock[i]);
            }
        }

        deferred.resolve(fixtures);

        return deferred.promise;
    }

};