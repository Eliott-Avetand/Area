
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const TwitchStrategy = require('passport-twitch-new').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models/db.js');
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LocalStrategy((username, password, cb) => {
    db.query('SELECT * FROM users WHERE email = ?', [username], (err, results) => {
        console.log(results);
        if (err)
            return cb(err);
        if (results.length == 0)
            return cb(null, false, {message: 'Incorrect username.'});
        bcrypt.compare(password, results[0].password, (compareErr, isValid) => {
            if (compareErr)
                return cb(compareErr);
            if (!isValid)
                return cb(null, false, { message: 'Incorrect username or password.' });
            console.log('REUSSI');
            return cb(null, {id: results[0].id, test:'test', email: results[0].email});
        });
    });
}));

passport.use(
    new GoogleStrategy({
        callbackURL: '/redirect/google',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        console.log(req.user);
        const user = {
            givenname: profile.name.givenName,
            familyname: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
            accessToken: accessToken,
            id: req.user?.id
        }
        const google = {
            token: accessToken,
            refreshToken: refreshToken
        }

        db.query(`UPDATE users SET google = '${JSON.stringify(google)}' WHERE id = '${user.id}'`, (err, results) => {
            if (err)
                console.log(err);
        });
        done(null, user);
    })
)

passport.use(
    new TwitterStrategy({
        callbackURL: '/redirect/twitter',
        consumerKey: process.env.TWITTER_CLIENT_ID,
        consumerSecret: process.env.TWITTER_CLIENT_SECRET,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        const user = {
            username: profile.username,
            twitterId: profile.id,
            id: req.user?.id
        }
        const twitter = {
            token: accessToken
        }

        db.query(`UPDATE users SET twitter = '${JSON.stringify(twitter)}' WHERE id = '${user.id}'`, (err, results) => {
            if (err)
                console.log(err);
        });
        done(null, user);
    })
)

passport.use(
    new TwitchStrategy({
        callbackURL: '/redirect/twitch',
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        scope: "user_read",
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        const user = {
            id: req.user?.id
        };
        const twitch = {
            token: accessToken,
            id: profile.id,
            name: profile.login
        }

        db.query(`UPDATE users SET twitch = '${JSON.stringify(twitch)}' WHERE id = '${user.id}'`, (err, results) => {
            if (err)
                console.log(err);
        });
        done(null, user);
    })
)

passport.use(
    new GithubStrategy({
        callbackURL: '/redirect/github',
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        const user = {
            id: req?.user.id
        };
        const github = {
            token: accessToken
        };

        db.query(`UPDATE users SET github = '${JSON.stringify(github)}' WHERE id = '${user.id}'`, (err, results) => {
            if (err)
                console.log(err);
        });
        done(null, user);
    })
)