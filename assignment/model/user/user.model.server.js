module.exports = function () {

    var models = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        setModels: setModels,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        updateUser: updateUser,
        deleteUser: deleteUser,
        deleteWebsiteReference: deleteWebsiteReference
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }
    
    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }
    
    function updateUser(userId, user) {
        return User.update(
            {_id: userId},
            {$set: user}
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    
    function setModels(_models) {
        models = _models;
    }
    
    function deleteWebsiteReference(userId, websiteId) {
        return User.update(
                {_id: userId},
                {$pull: {websites: websiteId}});
    }
};