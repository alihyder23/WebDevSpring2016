var http = require('http');

module.exports = function (app, fixturesModel) {

    app.get("/api/project/fixtures", fetchFixtures);
    app.get("/api/project/matches", getFixtures);
    app.get('/api/project/fixtures/search/:string', searchFixtures);

    function fetchFixtures(req, res){
        var options = {
            headers: { 'X-Auth-Token': 'e7d0b480d8e64eb5828355511253d108' },
            host: 'api.football-data.org',
            path:'/v1/teams/57/fixtures/',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                data = JSON.parse(body).fixtures;
                fixturesModel.updateFixtures(data);
                res.send(200);
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }

    function searchFixtures(req, res) {

        var string = req.params.string;

        fixturesModel.searchFixtures(string).then(function(fixtures) {
            res.json(fixtures);
        });
    }

    function getFixtures(req, res) {
        fixturesModel.getFixtures().then(function(fixtures) {
            res.json(fixtures);
        });
    }
};