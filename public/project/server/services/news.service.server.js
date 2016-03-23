module.exports = function(app, newsModel) {

    app.get('/api/project/user/:userId/news', findNewsForUser);
    app.get('/api/project/news/:formId', findNewsById);
    app.delete('/api/project/form/:formId', deleteNews);
    app.post('/api/project/user/:userId/form', createNews);
    app.put('/api/project/form/:formId', updateNews);

    function findNewsForUser(req, res) {

        var userId = parseInt(req.params.userId);

        newsModel.findNewsForUser(userId).then(function(news) {
           res.json(news);
        });
    }

    function findNewsById(req, res) {

        var id = req.params.formId;

        newsModel.findNewsById(id).then(function(news) {
           res.json(news);
        });
    }

    function deleteNews(req, res) {

        var id = req.params.formId;

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

};