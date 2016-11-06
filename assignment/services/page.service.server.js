module.exports = function (app) {
    var pages = [
        {_id: "321", name: "Post 1", websiteId: "123"},
        {_id: "432", name: "Post 2", websiteId: "123"},
        {_id: "543", name: "Post 3", websiteId: "234"},
        {_id: "322", name: "Post 4", websiteId: "234"},
        {_id: "433", name: "Post 5", websiteId: "345"},
        {_id: "544", name: "Post 6", websiteId: "345"},
        {_id: "545", name: "Post 7", websiteId: "123"}
    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.wid;
        page._id = (new Date()).getTime();
        page.websiteId = websiteId;
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.wid;
        var results = [];
        for(var p in pages){
            if(pages[p].websiteId == websiteId){
                results.push(pages[p]);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        for(var p in pages){
            if(pages[p]._id == pageId){
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function  updatePage(req, res) {
        var pageId = req.params.pid;
        var newPage = req.body;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages[p] = newPage;
                res.send(newPage);
                return;
            }
        }
        res.send('0');
    }

    function  deletePage(req, res) {
        var pageId = req.params.pid;
        for(var i = pages.length-1;i--;){
            if(pages[i]._id == pageId){
                pages.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

};
