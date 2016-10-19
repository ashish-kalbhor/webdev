(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        vm.pages = PageService.findPageByWebsiteId(websiteId);
        vm.userId = userId;
        vm.websiteId = websiteId;
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        vm.pages = PageService.findPageByWebsiteId(websiteId);
        vm.userId = userId;

        vm.createPage = createPage;

        function createPage(newPage) {
            if(newPage == null || newPage.name == null){
                vm.error = "Enter Page name to create one !";
            }else {
                PageService.createPage(websiteId, newPage)
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
            }
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        var pageId = parseInt($routeParams['pid']);

        var pages = PageService.findPageByWebsiteId(websiteId);
        var editablePage = PageService.findPageById(pageId);

        if(editablePage != null){
            vm.editablePage = editablePage;
        }

        if(pages != null){
            vm.pages = pages;
        }

        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function deletePage(pageId) {
            PageService.deletePage(pageId);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }

        function updatePage(pageId, page) {
            PageService.updatePage(pageId, page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
    }

})();