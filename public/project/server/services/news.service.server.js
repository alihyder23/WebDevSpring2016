module.exports = function(app, newsModel) {

    app.get('/api/project/user/:userId/news', findNewsForUser);
    app.get('/api/project/news', findAllNews);
    app.get('/api/project/news/:newsId', findNewsById);
    app.delete('/api/project/news/:newsId', deleteNews);
    app.post('/api/project/user/:userId/news', createNews);
    app.put('/api/project/news/:newsId', updateNews);
    app.get('/api/project/news/search/:string', searchNews);

    function findNewsForUser(req, res) {

        var userId = parseInt(req.params.userId);

        newsModel.findNewsForUser(userId).then(function(news) {
           res.json(news);
        });
    }

    function findAllNews(req, res) {

        newsModel.findAllNews().then(function(news) {
            res.json(news);
        });
    }

    function findNewsById(req, res) {

        var id = req.params.newsId;

        newsModel.findNewsById(id).then(function(news) {
           res.json(news);
        });
    }

    function deleteNews(req, res) {

        var id = req.params.newsId;

        newsModel.deleteNews(id).then(function(news) {
            res.json(news);
        });
    }

    function createNews(req, res) {

        var userId = parseInt(req.params.userId);
        var news = req.body;

        console.log(req.body);

        newsModel.createNews(userId, news).then(function(news) {
            res.json(news);
        });
    }

    function updateNews(req, res) {

        var id = req.params.newsId;
        var news = req.body;

        newsModel.updateNews(id, news).then(function(news) {
            res.json(news);
        });
    }

    function searchNews(req, res) {

        var string = req.params.string;

        newsModel.searchNews(string).then(function(news) {
            res.json(news);
        });
    }

};