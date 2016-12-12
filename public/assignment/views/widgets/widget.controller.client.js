(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);


    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm  = this;
        vm.userId  = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function () {

                });
        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.addWidget = addWidget;

        function addWidget(widgetType) {
	        WidgetService
                .createWidget(vm.pageId, {"type": widgetType})
                .success(function (widget) {
                    vm.widgetId = widget._id;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
                })
                .error(function (error) {
                    vm.error = "Error creating widget";
                });

        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm  = this;
        vm.userId  = $routeParams['uid'];
        vm.websiteId  = $routeParams['wid'];
        vm.pageId  = $routeParams['pid'];
        vm.widgetId  = $routeParams['wgid'];

        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.editableWidget = widget;
                })
                .error(function (error) {
                    vm.error = "Error loading widgets for this page. Please try again!";
                });
        }
        init();


        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {
                    vm.error = "Error deleting widget for this page. Please try again!";
                });
        }

        function updateWidget(widget) {

            if(widget == null || widget.name == null){
                vm.error = "Please provide Widget name before saving!"
            }else{
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function (error) {
                        vm.error = "Error updating widget for this page. Please try again!";
                    });
            }
        }

    }

})();
