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
    }

    function NewWebsiteController($scope) {
        var vm = this;
    }

    function EditWebsiteController($scope) {
        var vm = this;
    }

})();