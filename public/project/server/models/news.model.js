var q = require("q");

module.exports = function(db, mongoose) {

    var NewsSchema = require('./news.schema.js')(mongoose);
    var NewsModel = mongoose.model('News', NewsSchema);

    var api = {
        createNews: createNews,
        findAllNews: findAllNews,
        findNewsForUser: findNewsForUser,
        findNewsById: findNewsById,
        updateNews: updateNews,
        deleteNews: deleteNews,
        findNewsByTitle: findNewsByTitle,
        searchNews: searchNews
    };

    return api;

    function createNews(userId, news) {

        var deferred = q.defer();

        news.userId = userId;

        console.log("newNews: "+news);

        NewsModel.create(news, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllNews() {

        var deferred = q.defer();

        NewsModel.find({}, function(err, news) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(news);
            }
        });

        return deferred.promise;
    }

    function findNewsForUser(userId) {
        var deferred = q.defer();

        NewsModel.find({ userId: userId }, function(err, news) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(news);
            }
        });

        return deferred.promise;
    }

    function findNewsById(id) {

        var deferred = q.defer();

        NewsModel.findById(id, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        deferred.resolve(news);

        return deferred.promise;
    }

    function updateNews(id, news) {

        var deferred = q.defer();

        NewsModel.update({ _id: id }, news, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                findFormById(id).then(function(news) {
                    deferred.resolve(news);
                });
            }
        });

        return deferred.promise;
    }

    function deleteNews(id) {

        var deferred = q.defer();

        NewsModel.remove({ _id: id }, function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;

    }

    function findNewsByTitle(title) {

        var deferred = q.defer();

        NewsModel.findOne({ title: title }, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function searchNews(string) {

        var deferred = q.defer();

        NewsModel.find({}, function(err, news) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("THIS IS THE NEWS: " + news);

                var search = [];
                for (var i in news) {
                    if ((news[i].title.toLowerCase().indexOf(string) > -1) || (news[i].content.toLowerCase().indexOf(string) > -1)
                        || (news[i].author.toLowerCase().indexOf(string) > -1)) {
                        search.push(news[i]);
                    }

                    deferred.resolve(search);
                }
            }
        });

        return deferred.promise;
    }
};