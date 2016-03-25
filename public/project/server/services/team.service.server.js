var http = require('http');

module.exports = function (app, teamModel) {

    app.get("/api/project/team", fetchPlayers);
    app.get("/api/project/players", getPlayers);
    app.get('/api/project/team/search/:string', searchPlayers);

    function fetchPlayers(req, res){
        var options = {
            headers: { 'X-Auth-Token': 'e7d0b480d8e64eb5828355511253d108' },
            host: 'api.football-data.org',
            path:'/v1/teams/57/players',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                data = JSON.parse(body).players;
                teamModel.updateTeam(data);
                res.send(200);
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }

    function searchPlayers(req, res) {

        var string = req.params.string;

        teamModel.searchPlayers(string).then(function(players) {
            res.json(players);
        });
    }

    function getPlayers(req, res) {
        teamModel.getPlayers().then(function(players) {
            res.json(players);
        });
    }
};