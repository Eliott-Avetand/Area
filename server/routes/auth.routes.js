const passport = require('passport');
const { register } = require('../middlewares');
const controller = require('../controllers/auth.controller');
require('../config/passport-setup');
const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:8081" : "http://loustikarea.fr"

console.log(redirectUrl);

module.exports = app => {
    var router = require("express").Router();

    // About.json
    router.get('/about.json', controller.about)

    // DB connection
    router.post("/auth/register", [ register.verifyExistingUsers ], controller.register );
    router.post("/auth/logout", (req, res, next) => {
        req.logout(err => {
            if (err) return next(err);
            res.sendStatus(200);
        })
    });
    router.post("/auth/login", passport.authenticate('local', { session: true }), (req, res) => {
        res.sendStatus(200);
    });

    // Google
    router.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.force-ssl', 'https://mail.google.com/',
        'https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar'],
        prompt: 'consent',
        access_type: 'offline',
        session: false,
    }));
    router.get('/redirect/google', passport.authenticate('google'), (req, res) => {
        res.redirect(`${redirectUrl}/apps`);
    });

    // Twitter
    router.get('/auth/twitter', passport.authenticate('twitter', {
        session: false,
        scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access', 'follows.read'],
    }));

    router.get('/redirect/twitter', passport.authenticate('twitter'), (req, res) => {
        res.redirect(`${redirectUrl}/apps`);
    });

    // Twitch
    router.get('/auth/twitch', passport.authenticate('twitch', { session: false }));

    router.get('/redirect/twitch', passport.authenticate('twitch'), (req, res) => {
        res.redirect(`${redirectUrl}/apps`);
    });

    //Github
    router.get('/auth/github', passport.authenticate('github', {
        scope: ['user']
    }));

    router.get('/redirect/github', passport.authenticate('github', { session: false }), (req, res) => {
        res.redirect(`${redirectUrl}/apps`);
    });

    app.use('/', router);
};