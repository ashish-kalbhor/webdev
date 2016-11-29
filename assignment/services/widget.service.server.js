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
	               res.send(newWidget);
                },
                function (err) {
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

        var url = "/assignment/uploads/" + filename;

        var widget = {};
        widget._id = widgetId;
        widget._name = originalname;
        widget.width = width;
        widget.url = url;

        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                    res.redirect("/assignment/#/user/" + userId +
                        "/website/" + websiteId +
                        "/page/" + pageId +
                        "/widget/" + widgetId);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function sortWidget(req, res) {
        var pageId = req.params.pid;
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);

        WidgetModel
            .reorderWidget(pageId, initial, final)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

};
