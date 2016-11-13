module.exports = function (app, WebAppModels) {

    var WebsiteModel = WebAppModels.websiteModel;

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.uid;

        WebsiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error){
                    res.statusCode(400).send(error);
                }
            )
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        var results = [];

        WebsiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;

        WebsiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function  updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var newWebsite = req.body;

        WebsiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function(data) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function  deleteWebsite(req, res) {
        var websiteId = req.params.wid;

        WebsiteModel
            .deleteWebsite(websiteId)
            .then(
                function(data) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }
};