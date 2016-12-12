(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);


    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

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
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsiteByUserId(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {
                    vm.error = "Error loading websites for the user. Please try again!";
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
                        console.log("Website controller " + website)
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {
                        vm.error = "Error creating the website. Please try again!"
                    });
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsiteByUserId(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {
                    vm.error = "Error loading websites for this user. Please try again!";
                });

            WebsiteService
                .findWebsiteById(websiteId)
                .success(function (website) {
                    vm.editableWebsite = website;
                })
                .error(function () {
                    vm.error = "Error loading website for this user. Please try again!";
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
                    vm.error = "Error deleting website for this user. Please try again!";
                });
        }

        function updateWebsite(websiteId, website) {

            if(website == null || website.name == null){
                vm.error = "Please enter website name!";
            }else{
                WebsiteService
                    .updateWebsite(websiteId, website)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {
                        vm.error = "Error updating website for this user. Please try again!";
                    });
            }


        }

    }

})();