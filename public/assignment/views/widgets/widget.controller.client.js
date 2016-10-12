(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);


    function WidgetListController($scope) {
        var vm = this;

    }

    function NewWidgetController($scope) {
        var vm = this;
    }

    function EditWidgetController($scope) {
        var vm = this;
    }

})();