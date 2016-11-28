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

        if (widget.type == "YOUTUBE" && !widget.width) {
            widget.width = "100%";
        }
	
        WidgetModel
            .createWidget(pageId, widget)
            .then(
                function (newWidget) {
		    console.log("Success and found " + newWidget);
                    res.send(newWidget);
                },
                function (err) {
		    console.log("Error in creating widget " + err);
                    res.sendStatus(400).send(err);
                }
            );
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
            return;
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
        var pageId = parseInt(req.params.pageId);
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);

        // Find and store start position in widgets array
        var newStartIndex = -1;
        var newEndIndex = -1;
        var count = 0;

        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (count == initial) {
                    newStartIndex = parseInt(w);
                    if (newEndIndex != -1) {
                        break;
                    }
                }
                if (count == final) {
                    newEndIndex = parseInt(w);
                    if (newStartIndex != -1) {
                        break;
                    }
                }
                count++;
            }
        }

        widgets.splice(parseInt(newEndIndex), 0, widgets.splice(newStartIndex, 1)[0]);
        res.sendStatus(200);
    }

};
