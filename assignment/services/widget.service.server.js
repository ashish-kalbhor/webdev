module.exports = function (app, model) {

    var model = model;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { _id: "123", widgetType: "HEADER", pageId: "321", size: 2, text: "GIZMODO"},
        { _id: "234", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
        { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
        { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
        { _id: "567", widgetType: "HEADER", pageId: "321", size: 4, text: "Lorem ipsum"},
        { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
        { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
    ];

    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findAllWidgetsForPage);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pid/widget",sortWidget);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pid;
        widget._id = (new Date()).getTime();
        widget.pageId = pageId;
        widget.size = "1";
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pid;
        var results = [];
        for(var w in widgets){
            if(widgets[w].pageId == pageId){
                results.push(widgets[w]);
            }
        }
        res.send(results);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    function  updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var newWidget = req.body;
        for(var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets[w] = newWidget;
                res.send(newWidget);
                return;
            }
        }
        res.send('0');
    }

    function  deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for(var i = widgets.length-1;i--;){
            if(widgets[i]._id == widgetId){
                widgets.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId        = req.body.websiteId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if (widgets[i]._id == widgetId) {
                widgets[i].url = "/uploads/" + filename;
            }
        }

        res.redirect("/assignment/#/"
            + "user/" + userId +
            "/website/" + websiteId +
            "/page/" + pageId +
            "/widget/" + widgetId);
    }

    function sortWidget() {
        var pageId = req.params.pid;
        var start = req.query['start'];
        var end = req.query['end'];

        var spliceIndex = 0;
        var occurrences = 0;
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (occurrences == start) {
                    spliceIndex = parseInt(w);
                    break;
                }
                else {
                    occurrences++;
                }
            }
        }

        occurrences = 0;
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (occurrences == end) {
                    widgets.splice(parseInt(w), 0, widgets.splice(spliceIndex, 1)[0]);
                    break;
                }
                else {
                    occurrences++;
                }
            }
        }
        res.sendStatus(200);    //done
    }

};