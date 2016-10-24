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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
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
            var newWidget = {"widgetType": widgetType, "text": "Random new widget text"};
            vm.widgetId = WidgetService.createWidget(vm.pageId, newWidget);
            console.log("created " + vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
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
            vm.editableWidget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();


        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

    }

})();