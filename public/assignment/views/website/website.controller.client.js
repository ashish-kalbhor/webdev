(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);

        WebsiteService
            .findWebsiteByUserId(vm.userId)
            .success(function (websites) {
                vm.websites = websites;
            })
            .error(function () {

            });
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsiteByUserId(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {

                });
        }
        init();

        function createWebsite(website) {
            if(website == null || website.name == null){
                vm.error = "Enter Website name to create one!";
            }else {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .success(function (website) {
                        console.log("created " + website.name);
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {

                    });
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsiteByUserId(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {

                });

            WebsiteService
                .findWebsiteById(websiteId)
                .success(function (website) {
                    vm.editableWebsite = website;
                })
                .error(function () {

                });
        }
        init();

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {

                });
        }

        function updateWebsite(websiteId, website) {
            WebsiteService
                .updateWebsite(websiteId, website)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {

                });
        }

    }

})();