
module.exports = function(app) {
    require("./services/field.service.server.js")(app, formModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/user.service.server.js")(app, userModel);
};