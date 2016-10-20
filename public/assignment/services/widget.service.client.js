(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService(){
        var widgets = [
                { _id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
                { _id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
                { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
                { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
                { _id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
                { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
                { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };

        return api;

        function  createWidget(pageId, widget) {
            var prevId = parseInt(widgets[widgets.length-1]._id);
            var id = prevId + 1;
            var newWidget = {_id: id, widgetType: widget.type, pageId: widget.pageId, text: widget.text};
            widgets.push(newWidget);
            return id;
        }

        function  findWidgetsByPageId(pageId) {
            var results = [];
            for(var w in widgets){
                if(widgets[w].pageId == pageId){
                    results.push(widgets[w]);
                }
            }
            return results;
        }

        function  findWidgetById(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    return widgets[w];
                }
            }
        }

        function  updateWidget(widgetId, widget) {
            for(var w in widgets){
                if(widgets[w]._id == widgetId){
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].text = widget.text;
                    break;
                }
            }
        }

        function  deleteWidget(widgetId) {
            for(var i = widgets.length-1;i--;){
                if(widgets[i]._id == widgetId){
                    widgets.splice(i,1);
                }
            }
        }
    }

})();