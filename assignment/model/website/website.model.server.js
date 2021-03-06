module.exports = function () {

    var models = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        setModels: setModels,
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        deletePageReference: deletePageReference
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user:userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {$set: website}
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
    
    function setModels(_models) {
        models = _models;
    }
    
    function deletePageReference(websiteId, pageId) {
        return Website.update(
                {_id: websiteId},
                {$pull: {pages: pageId}});
    }
};