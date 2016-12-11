module.exports = function () {

    var connectionString = "mongodb://localhost/cs5610-assignment";
    if(process.env.HEROKU_MONGODB_DB_USERNAME) {
        connectionString = "mongodb://" +
            process.env.HEROKU_MONGODB_DB_USERNAME + ":" +
            process.env.HEROKU_MONGODB_DB_HOST + ':' +
            process.env.HEROKU_MONGODB_DB_PORT + '/' +
            process.env.HEROKU_APP_NAME;
    }

    var mongoose = require("mongoose");
    //mongoose.connect("mongodb://localhost/cs5610-project");
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();

    var models = {
        userModel: userModel
    };

    userModel.setModels(models);
    return models;
};