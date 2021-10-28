// import stuff
const { Router } = require("express");
const User = require("../models").user;

//define routes
const router = new Router();

router.get("/", (req, res) => res.send("Welcome to imagepage!"));

//export
module.exports = router;
