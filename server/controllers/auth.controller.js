const User = require("../models/user.model");
const db = require("../models/db");
const secret = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const about = require('../about.json');

exports.about = (req, res) => {
    const newAbout = {
        "client": {
            "host": `${req.ip}`
        },
        "server": {
            "current_time": Date.now(),
            ...about
        }
    }
    res.json(newAbout);
}

exports.register = (req, res) => {
    try {
        const user = new User({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        User.create(user, (err, data) => {
            if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
            else res.send(data);
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, result) => {
            if (err)
            return;
            if (result.length) {
                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    result[0].password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                    });
                }

                const token = jwt.sign({ id: result[0].id }, secret, {
                    expiresIn: 86400,
                });

                req.session.token = token;

                return res.status(200).send({
                    id: result[0].id,
                    lastname: result[0].lastname,
                    firstname: result[0].firstname,
                    email: result[0].email,
                });
            }
            return res.status(404).send({ message: "User not found." });
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
