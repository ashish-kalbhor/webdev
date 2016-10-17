(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsiteByUserId(userId);
        vm.userId = userId;
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsiteByUserId(userId);
        vm.userId = userId;

        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if(website == null || website.name == null){
                vm.error = "Enter Website name to create one !";
            }else {
                WebsiteService.createWebsite(userId, website);
                $location.url("/user/" + userId + "/website");
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);

        var websites = WebsiteService.findWebsiteByUserId(userId);
        var editableWebsite = WebsiteService.findWebsiteById(websiteId);

        if(editableWebsite != null){
            vm.editableWebsite = editableWebsite;
        }

        if(websites != null){
            vm.websites = websites;
        }
        vm.userId = userId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/" + userId + "/website");
        }

        function updateWebsite(websiteId, website) {
            WebsiteService.updateWebsite(websiteId, website);
            $location.url("/user/" + userId + "/website");
        }

    }

})();