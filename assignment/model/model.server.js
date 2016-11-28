module.exports = function () {

    var connectionString = 'mongodb://heroku_gb8bxpqj:e9erkuff8cuet1t0e621jepnuv@ds033116.mlab.com:33116/heroku_gb8bxpqj';
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
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