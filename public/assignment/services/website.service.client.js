(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService(){
        var websites = [
            {_id: "123", name: "Facebook", developerId: "456"},
            {_id: "234", name: "Twitter", developerId: "456"},
            {_id: "456", name: "Gizmodo", developerId: "456"},
            {_id: "567", name: "Tic Tac Toe", developerId: "123"},
            {_id: "678", name: "Checkers", developerId: "123"},
            {_id: "789", name: "Chess", developerId: "234"}
        ];

        var api = {
            createWebsite : createWebsite,
            findWebsiteByUserId : findWebsiteByUserId,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };

        return api;

        function  createWebsite(userId, website) {
            var prevId = parseInt(websites[websites.length-1]._id);
            var id = prevId + 1;
            var newWebsite = {_id: id, name: website.name, developerId: userId};
            websites.push(newWebsite);
            return id;
        }

        function  findWebsiteByUserId(userId) {
            var results = [];
            for(var w in websites){
                if(websites[w].developerId == userId){
                    results.push(websites[w]);
                }
            }
            return results;
        }

        function  findWebsiteById(websiteId) {
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    return websites[w];
                }
            }
        }

        function  updateWebsite(websiteId, website) {
            for(var w in websites){
                if(websites[w]._id == websiteId){
                    websites[w].name = website.name;
                    break;
                }
            }
        }

        function  deleteWebsite(websiteId) {
            for(var i = websites.length-1;i--;){
                if(websites[i]._id == websiteId){
                    websites.splice(i,1);
                }
            }
        }
    }

})();