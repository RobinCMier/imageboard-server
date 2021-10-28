// import stuff
const { Router, response } = require("express");
const Image = require("../models").image;

//define routes
const router = new Router();

router.get("/", (req, res) => res.send("Welcome to userpage!"));

//export
module.exports = router;
