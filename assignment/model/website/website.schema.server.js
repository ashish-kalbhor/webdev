module.exports = function () {

    var PageSchema = require("../page/page.schema.server");
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: {type: String, required: true},
        description: String,
        pages: [PageSchema],
        dateCreated: {type: Date, default: Date.now}
    },{collection: 'website'});

    return WebsiteSchema;
};