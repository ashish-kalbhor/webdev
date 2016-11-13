module.exports = function (app, WebAppModels) {

    var PageModel = WebAppModels.pageModel;

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.wid;

        PageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error){
                    res.statusCode(400).send(error);
                }
            )
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;

        PageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;

        PageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.send(page);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }

    function  updatePage(req, res) {
        var pageId = req.params.pid;
        var newPage = req.body;
        PageModel
            .updatePage(pageId, newPage)
            .then(
                function(data) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function  deletePage(req, res) {
        var pageId = req.params.pid;
        PageModel
            .deletePage(pageId)
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
