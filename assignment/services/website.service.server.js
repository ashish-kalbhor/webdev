module.exports = function (app) {
    var websites = [
        {_id: "123", name: "Facebook", developerId: "456"},
        {_id: "234", name: "Twitter", developerId: "456"},
        {_id: "456", name: "Gizmodo", developerId: "456"},
        {_id: "567", name: "Tic Tac Toe", developerId: "123"},
        {_id: "678", name: "Checkers", developerId: "123"},
        {_id: "789", name: "Chess", developerId: "234"}
    ];

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.uid;
        website._id = (new Date()).getTime();
        website.developerId = userId;
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.uid;
        var results = [];
        for(var w in websites){
            if(websites[w].developerId == userId){
                results.push(websites[w]);
            }
        }
        res.send(results);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        for(var w in websites){
            if(websites[w]._id == websiteId){
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

    function  updateWebsite(req, res) {
        var websiteId = req.params.wid;
        var newWebsite = req.body;
        for(var w in websites){
            if(websites[w]._id == websiteId){
                websites[w] = newWebsite;
                res.send(newWebsite);
                return;
            }
        }
        res.send('0');
    }

    function  deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        for(var i = websites.length-1;i--;){
            if(websites[i]._id == websiteId){
                websites.splice(i,1);
                return;
            }
        }
        res.send('0');
    }

};