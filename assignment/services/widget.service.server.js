module.exports = function (app, WebAppModels) {

    var WidgetModel = WebAppModels.widgetModel;

    var mime = require('mime');
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage});

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
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        WidgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function  updateWidget(req, res) {
        var widgetId = req.params.wgid;
        var newWidget = req.body;

        WidgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function(data) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function  deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        WidgetModel
            .deleteWidget(widgetId)
            .then(
                function(data) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;

        // if no file given
        if (!myFile || !myFile.originalname) {
            res.redirect("/assignment/#/user/" + userId +
                "/website/" + websiteId +
                "/page/" + pageId +
                "/widget/" + widgetId);
        }

        var originalName  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if (widgets[i]._id == widgetId) {
                widgets[i].name = originalName;
                widgets[i].width = width;
                widgets[i].url = "/assignment/uploads/" + filename;

                res.redirect("/assignment/#/"
                    + "user/" + userId +
                    "/website/" + websiteId +
                    "/page/" + pageId +
                    "/widget/" + widgetId);
                return;
            }
        }

        res.redirect("Something went wrong");
    }

    function sortWidget(req, res) {
        var pageId = req.params.pid;
        var before = req.query.initial;
        var after = req.query.final;

        var spliceIndex = 0;
        var occurrences = 0;
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (occurrences == before) {
                    spliceIndex = parseInt(w);
                    break;
                }
                else {
                    occurrences++;
                }
            }
        }

        // Updating widget positions
        occurrences = 0;
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (occurrences == after) {
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