(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages = [
            {_id: "321", name: "Post 1", websiteId: "123"},
            {_id: "432", name: "Post 2", websiteId: "123"},
            {_id: "543", name: "Post 3", websiteId: "234"},
            {_id: "322", name: "Post 4", websiteId: "234"},
            {_id: "433", name: "Post 5", websiteId: "345"},
            {_id: "544", name: "Post 6", websiteId: "345"}
        ];

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return api;

        function  createPage(websiteId, page) {
            var prevId = parseInt(pages[pages.length-1]._id);
            var id = prevId + 1;
            var newPage = {_id: id, name: page.name, websiteId: websiteId};
            pages.push(newPage);
            return id;
        }

        function  findPageByWebsiteId(websiteId) {
            var results = [];
            for(var p in pages){
                if(pages[p].websiteId == websiteId){
                    results.push(pages[p]);
                }
            }
            return results;
        }

        function  findPageById(pageId) {
            var results = [];
            for(var p in pages){
                if(pages[p]._id == pageId){
                    results.push(pages[p]);
                }
            }
            return results;
        }

        function  updatePage(pageId, page) {
            for(var p in pages){
                if(pages[p]._id == pageId){
                    pages[p].name = page.name;
                    break;
                }
            }
        }

        function  deletePage(pageId) {
            for(var i = pages.length-1;i--;){
                if(pages[i]._id == pageId){
                    pages.splice(i,1);
                }
            }
        }
    }

})();