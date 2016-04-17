var q = require("q");


module.exports = function(db, mongoose) {

    var FixtureSchema = require('./fixtures.schema.js')(mongoose);
    var FixtureModel = mongoose.model('Fixtures', FixtureSchema);

    var api = {
        updateFixtures: updateFixtures,
        searchFixtures: searchFixtures,
        getFixtures: getFixtures
    };

    return api;

    function updateFixtures(fixtures) {
        var deferred = q.defer();

        FixtureModel.remove(({}),function(err, result) {
        });

        FixtureModel.create(fixtures, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {

            }
        });

        return deferred.promise;
    }

    function getFixtures() {
        var deferred = q.defer();

        FixtureModel.find({}, function(err, fixtures) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(fixtures);
            }
        });

        return deferred.promise;
    }

    function searchFixtures(string) {

        var deferred = q.defer();

        FixtureModel.find({}, function(err, fixtures) {
            if(err) {
                deferred.reject(err);
            } else {
                var search = [];
                for (var i in fixtures) {
                    if ((fixtures[i].date.toLowerCase().indexOf(string) > -1) || (fixtures[i].status.toLowerCase().indexOf(string) > -1)
                        || (fixtures[i].homeTeamName.toLowerCase().indexOf(string) > -1) || (fixtures[i].awayTeamName.toLowerCase().indexOf(string) > -1)) {
                        search.push(fixtures[i]);
                    }

                    deferred.resolve(search);
                }
            }
        });

        return deferred.promise;

    }

};