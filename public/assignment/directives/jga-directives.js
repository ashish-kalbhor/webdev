(function () {
    angular
        .module("jga-directives", [])
        .directive("wamSortable", wamSortable);
    
    function wamSortable() {
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start: function(event, ui) {
                    start = $(ui.item).index();
                },
                stop: function(event, ui) {
                    end = $(ui.item).index();
                    if(start >= end){
                        start --;
                    }
                    scope.sortController.sort(start, end);
                }
            });
        }
        return {
            scope: {},
            restrict: 'C',
            link: linker,
            controller: sortController,
            controllerAs: 'sortController'
        }
    }

    function sortController($routeParams, WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            WidgetService.sortWidget($routeParams.pid, start, end);
        }
    }
});