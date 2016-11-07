(function () {
    angular
        .module('jgaDirectives', [])
        .directive('wamSortable', wamSortable);
    
    function wamSortable() {
        function linker(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start: function(event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function(event, ui) {
                    final = $(ui.item).index();
                    scope.wamSortableController.sort(initial, final);
                }
            });
        }

        return {
            scope: {},
            restrict: 'C',
            link: linker,
            controller: wamSortableController,
            controllerAs: 'wamSortableController'
        }
    }

    function wamSortableController($routeParams, WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(initial, final) {
            WidgetService.sortWidget($routeParams.pid, initial, final);
        }
    }
})();