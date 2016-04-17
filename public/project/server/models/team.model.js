var q = require("q");


module.exports = function(db, mongoose) {

    var TeamSchema = require('./team.schema.js')(mongoose);
    var TeamModel = mongoose.model('Team', TeamSchema);


    var api = {
        updateTeam: updateTeam,
        searchPlayers: searchPlayers,
        getPlayers: getPlayers
    };

    return api;

    function updateNews(id, news) {

        var deferred = q.defer();

        NewsModel.update({ _id: id }, news, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                findNewsById(id).then(function(news) {
                    deferred.resolve(news);
                });
            }
        });

        return deferred.promise;
    }

    function updateTeam(team) {
        var deferred = q.defer();

        TeamModel.remove(({}),function(err, result) {
        });

        TeamModel.create(team, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {

            }
        });

        return deferred.promise;
    }

    function getPlayers() {
        var deferred = q.defer();

        TeamModel.find({}, function(err, team) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(team);
            }
        });

        return deferred.promise;
    }

    function searchPlayers(string) {

        var deferred = q.defer();

        TeamModel.find({}, function(err, team) {
            if(err) {
                deferred.reject(err);
            } else {
                var search = [];
                for (var i in team) {
                    if ((team[i].name.toLowerCase().indexOf(string) > -1) || (team[i].position.toLowerCase().indexOf(string) > -1)
                        || (team[i].nationality.toLowerCase().indexOf(string) > -1)) {
                        search.push(team[i]);
                    }

                    deferred.resolve(search);
                }
            }
        });

        return deferred.promise;
    }
};