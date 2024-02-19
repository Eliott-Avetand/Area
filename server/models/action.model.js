const db = require("./db.js");

// User's constructor
const Action = function(action) {
    this.actionId = action.action;
    this.reactionId = action.reaction;
    this.data = action.data;
    this.userId = action.user;
};

Action.create = (newAction, result) => {
    db.query("INSERT INTO actions SET ?", newAction, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newAction });
        result(null, { id: res.insertId, ...newAction });
    });
};

Action.getAll = result => {
    db.query("SELECT * FROM actions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("actions: ", res);
        result(null, res);
    });
};

Action.remove = (id, result) => {
    db.query("DELETE FROM actions WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted action with id: ", id);
        result(null, res);
    });
};

module.exports = Action;