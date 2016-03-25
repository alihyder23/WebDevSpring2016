var http = require('http');

module.exports = function (app) {

    app.get("/api/project/fixtures", fetchFixtures);

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
                console.log(JSON.parse(body));
                res.send(JSON.parse(body));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }
};