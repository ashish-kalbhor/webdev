module.exports = function (app, WebAppModels) {

    var UserModel = WebAppModels.userModel;

    // Defining Configs for Facebook and Google
    var fbConfig = {
        clientID    :   process.env.FACEBOOK_CLIENT_ID,
        clientSecret:   process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL :   process.env.FACEBOOK_CALLBACK_URL
    };

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };

    var passport      = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(fbConfig, fbStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/loggedin', loggedin);
    app.post ('/api/register', register);
    app.get('/api/user', findUser);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {successRedirect: '/assignment/#/user', failureRedirect: '/assignment/#/login'}));
    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/auth/google/callback', passport.authenticate('google',
        {successRedirect: '/assignment/#/user', failureRedirect: '/assignment/#/login'}));
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
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (error) {
                    return done(error);
                }
            )
    }

    function fbStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username: names[0],
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return UserModel
                                    .createUser(newFacebookUser)
                                    .then(
                                        function (user) {
                                            return done(null, user);
                                        },
                                        function (err) {
                                            return done(err);
                                        }
                                    )
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            username: profile.name.givenName,
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return UserModel
                                    .createUser(newGoogleUser)
                                    .then(function (user) {
                                            return done(null, user);
                                        },
                                        function (err) {
                                            return done(err);
                                        }
                                    );
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) {
                        return done(err);
                    }
                }
            );
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
        user.password = bcrypt.hashSync(user.password);
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
        }else {
            res.json(req.user);
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
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
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
