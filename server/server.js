const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');
const app = express();
const privateKey = fs.readFileSync('./.ssl/privatekey.pem');
const certificate = fs.readFileSync('./.ssl/certificate.pem');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const passport = require('passport');
const session = require('express-session');

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     sameSite: 'none',
    //     httpOnly: true,
    //     secure: true,
    //     maxAge: 1000 * 60 * 30
    // }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: ['http://localhost:8081', "http://loustikarea.fr"],
        methods: "GET, POST, OPTIONS, PUT, DELETE",
        allowedHeaders: 'Content-Type, Authorization',
        optionsSuccessStatus: 200,
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./routes/index.routes.js")(app);
require('./actions/actions');

http.createServer(/*{ key: privateKey, cert: certificate },*/ app).listen(process.env.PORT, () => {
    console.log('Server app started on port ' + process.env.PORT);
});

