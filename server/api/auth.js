
const passportSetup = require('../config/passport-setup');
const mysql = require('mysql2');
const authRoutes = require('./auth-routes');

module.exports = app => {
    const db = mysql.createPool({

    });

    app.use('/auth', authRoutes);
}
