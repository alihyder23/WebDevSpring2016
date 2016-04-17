module.exports = function(app, db, mongoose) {

    var projectUserModel = require('./models/user.model.js')(db, mongoose);
    require('./services/user.service.server.js')(app, projectUserModel);

    var newsModel = require('./models/news.model.js')(db, mongoose);
    require('./services/news.service.server.js')(app, newsModel);

    var projectUserModel = require('./models/user.model.js')(db, mongoose);
    require('./services/user.service.server.js')(app, projectUserModel);

    var teamModel = require('./models/team.model.js')(db, mongoose);
    require('./services/team.service.server.js')(app, teamModel);

    var fixturesModel = require('./models/fixtures.model.js')(db, mongoose);
    require('./services/fixtures.service.server.js')(app, fixturesModel);

};