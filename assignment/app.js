module.exports = function(app) {
        var WebAppModels = require("./model/model.server")();
        require("./services/user.service.server.js")(app, WebAppModels);
        require("./services/website.service.server.js")(app, WebAppModels);
        require("./services/page.service.server.js")(app, WebAppModels);
        require("./services/widget.service.server.js")(app, WebAppModels);
};

