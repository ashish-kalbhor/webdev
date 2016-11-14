module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("../website/website.schema.server")(mongoose);
    var UserSchema = mongoose.Schema({
       username: {type: String, required: true},
       password: String,
       firstName: String,
       lastName: String,
       email: String,
       phone: String,
       websites: [WebsiteSchema],
       dateCreated: {type: Date, default: Date.now}
    },{collection: 'user'});

    return UserSchema;
};