var mock = require("./news.mock.json");

// load q promise library
var q = require("q");
var uuid = require("node-uuid");

module.exports = function() {

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

        news._id = uuid.v4();
        news.userId = userId;
        mock.push(news);

        console.log("newNews: "+news);

        findNewsForUser(userId).then(function(news) {
           deferred.resolve(news);
        });

        return deferred.promise;
    }

    function findAllNews() {

        var deferred = q.defer();

        deferred.resolve(mock);

        return deferred.promise;
    }

    function findNewsForUser(userId) {
        var deferred = q.defer();

        findAllNews().then(function(news) {
            var userNews = [];

            for(var n in news) {
                if(news[n].userId === userId) {
                    userNews.push(news[n]);
                }
            }
            deferred.resolve(userNews);
        });

        return deferred.promise;
    }

    function findNewsById(id) {

        var deferred = q.defer();

        var form = null;

        for(var f in mock) {
            if (mock[f]._id === id) {
                news = mock[f];
            }
        }

        deferred.resolve(news);

        return deferred.promise;
    }

    function updateNews(id, news) {

        var deferred = q.defer();

        findNewsById(id).then(function(oldNews) {
            oldNews.title = form.title;
            oldNews.userId = form.userId;

            deferred.resolve(oldNews);
        });

        return deferred.promise;
    }

    function deleteNews(id) {

        var deferred = q.defer();

        for(var i in mock) {
            if(mock[i]._id === id) {

                console.log(mock[i]._id + " === " + id);


                var userId = mock[i].userId;
                mock.splice(i, 1);

                console.log('just spliced. finding news for user '+userId);

                findNewsForUser(userId).then(function(news) {
                    console.log('found them, now resolving...');
                    deferred.resolve(news);
                });
            }
            else {
                console.log(mock[i]._id + " !== " + id);
            }
        }

        return deferred.promise;

    }

    function findNewsByTitle(title) {

        var deferred = q.defer();

        var news = null;

        for(var f in mock) {
            if (mock[f].title === title) {
                news = mock[f];
            }
        }

        deferred.resolve(news);

        return deferred.promise;
    }

    function searchNews(string) {

        var deferred = q.defer();

        var news = [];

        for (var i in mock) {
            if ((mock[i].title.toLowerCase().indexOf(string) > -1) || (mock[i].content.toLowerCase().indexOf(string) > -1)
                || (mock[i].author.toLowerCase().indexOf(string) > -1)) {
                news.push(mock[i]);
            }
        }

        deferred.resolve(news);

        return deferred.promise;
    }
};