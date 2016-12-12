(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        PageService
            .findPageByWebsiteId(vm.websiteId)
            .success(function (pages) {
                vm.pages = pages;
            })
            .error(function () {

            });
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {
                    vm.error = "Error loading pages for this website. Please try again!";
                });
        }

        init();

        function createPage(newPage) {
            if(newPage == null || newPage.name == null){
                vm.error = "Enter Page name to create one !";
            }else {
                PageService
                    .createPage(vm.websiteId, newPage)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                    })
                    .error(function () {
                        vm.error = "Error creating pages for this website. Please try again!";
                    });
            }
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        init();

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {
                    vm.error = "Error loading pages for this website. Please try again!";
                });

            PageService
                .findPageById(pageId)
                .success(function (page) {
                    vm.editablePage = page;
                })
                .error(function () {
                    vm.error = "Error loading page for this website. Please try again!";
                });
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                    vm.error = "Error deleting page for this website. Please try again!";
                });
        }

        function updatePage(page) {
            if(page == null || page.name == null){
                vm.error = "Enter Page name before updating !";
            }else{
                PageService
                    .updatePage(pageId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function () {
                        vm.error = "Error updating page for this website. Please try again!";
                    });
            }

        }
    }

})();
