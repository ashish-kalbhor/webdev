module.exports = function () {

    var connectionString = 'mongodb://heroku_gb8bxpqj:e9erkuff8cuet1t0e621jepnuv@ds033116.mlab.com:33116/heroku_gb8bxpqj';
    if(process.env.HEROKU_MONGODB_DB_PASSWORD) {
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