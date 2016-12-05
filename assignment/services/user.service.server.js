module.exports = function (app, WebAppModels) {

    var UserModel = WebAppModels.userModel;

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/loggedin', loggedin);
    app.post ('/api/register', register);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200).send();
    }

    function localStrategy(username, password, done) {
        UserModel
            .createUser({username: username, password: password})
            .then(
                function (user) {
                    if(!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (error) {
                    return done(error);
                }
            )
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var user = req.body;

        UserModel
            .createUser(user)
            .then(function(user){
                    if(user){

                        req.login(user, function(err) {
                                    if(err) {
                                        res.status(400).send(err);
                                    } else {
                                        res.json(user);
                                    }
                        });
                     }
                 }
         );
    }

    function findUser(req, res) {
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req, res);
        }else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.uid;

        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
    }

    function  updateUser(req, res) {
        var userId = req.params.uid;
        var newUser = req.body;

        UserModel
            .updateUser(userId, newUser)
            .then(
                function (data) {
                    res.sendStatus(200).send(data);
                },
                function (error) {
                    res.statusCode(500).send(error);
                }
            )

    }

    function  deleteUser(req, res) {
        var userId = req.params.uid;

        UserModel
            .deleteUser(userId)
            .then(
                function (data) {
                    res.sendStatus(200).send(data);
                },
                function (error) {
                    res.statusCode(500).send(error);
                }
            )
    }
};