const db = require("../models/db");

verifyExistingUsers = async (req, res, next) => {
    try {
        db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, result) => {
            if (err)
                return;
            if (result.length)
                return res.status(400).send({ message: "User already exists!" });
            next();
        });
    } catch (error) {
        return res.status(500).send({ message: "An error occured." });
    }
};

const verifyRegister = { verifyExistingUsers };

module.exports = verifyRegister;