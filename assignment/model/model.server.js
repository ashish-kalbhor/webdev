module.exports = function () {

    var mongoose = require("mongoose");
    var connectionString = "mongodb://localhost/cs5610-assignment";
    if(process.env.HEROKU_MONGODB_DB_USERNAME) {
        connectionString = "mongodb://" +
            process.env.HEROKU_MONGODB_DB_USERNAME + ":" +
            process.env.HEROKU_MONGODB_DB_HOST + ':' +
            process.env.HEROKU_MONGODB_DB_PORT + '/' +
            process.env.HEROKU_APP_NAME;
    }


    //mongoose.connect("mongodb://localhost/cs5610-assignment");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    userModel.setModels(models);
    websiteModel.setModels(models);
    pageModel.setModels(models);
    widgetModel.setModels(models);

    return models;
};