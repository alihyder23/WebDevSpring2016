var mock = require("./team.mock.json");

// load q promise library
var q = require("q");


module.exports = function() {

    var api = {
        updateTeam: updateTeam,
        searchPlayers: searchPlayers,
        getPlayers: getPlayers
    };

    return api;

    function updateTeam(team) {
        mock = team;
    }

    function getPlayers() {
        var deferred = q.defer();

        deferred.resolve(mock);

        return deferred.promise;
    }

    function searchPlayers(string) {

        var deferred = q.defer();

        var players = [];

        for (var i in mock) {
            if ((mock[i].name.toLowerCase().indexOf(string) > -1) || (mock[i].position.toLowerCase().indexOf(string) > -1)
                || (mock[i].nationality.toLowerCase().indexOf(string) > -1)) {
                players.push(mock[i]);
            }
        }
        deferred.resolve(players);

        return deferred.promise;
    }

};