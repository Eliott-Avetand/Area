module.exports = app => {
    const actions = require("../controllers/action.controller.js");
    var router = require("express").Router();

    router.post("/", actions.create);
    router.get("/", actions.findAll);
    router.delete("/:id", actions.delete);

    app.use('/area', router);
};