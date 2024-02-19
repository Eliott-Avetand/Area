const db = require("../models/db.js");
const Action = require("../models/action.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    const action = new Action({
        action: req.body.action,
        reaction: req.body.reaction,
        data: req.body.data,
        user: req.body.user
    });
    Action.create(action, (err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the action." });
        else res.send(data);
    });
};


exports.findAll = (req, res) => {
    Action.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message || "Some error occurred while retrieving Action." });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Action.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Not found action with id ${req.params.id}.` });
            } else {
                res.status(500).send({ message: "Could not delete action with id " + req.params.id });
            }
        } else res.send({ data: { id: req.params.id }, message: `Action was deleted successfully!` });
    });
};
