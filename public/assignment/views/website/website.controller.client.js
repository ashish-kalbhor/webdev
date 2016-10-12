(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($scope) {
        var vm = this;
    }

    function NewWebsiteController($scope) {
        var vm = this;
    }

    function EditWebsiteController($scope) {
        var vm = this;
    }

})();