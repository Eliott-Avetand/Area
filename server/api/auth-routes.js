const router = require('express').Router();
const passport = require('passport');
require('../config/passport-setup');


router.get('/login', (req, res) => {
    res.send('Login page');
});

router.get('/logout', (req, res) => {
    res.send('logging out');
});

router.get('/aze', (req, res) => {
    res.send('aze');
    console.log('aze');
});
// auth with google


module.exports = router;