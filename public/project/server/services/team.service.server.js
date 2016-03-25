var http = require('http');

module.exports = function (app) {

    app.get("/api/project/team", fetchPlayers);

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
                res.send(JSON.parse(body));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }
};