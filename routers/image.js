// import stuff
const { Router } = require("express");
const Image = require("../models").image;
const { toJWT, toData } = require("../auth/jwt");

//define routes
const router = new Router();
//basepage
router.get("/", (req, res) => res.send("Welcome to imagepage!"));
//GET requests
//all
router.get("/all", async (req, res) => {
  try {
    const allImages = await Image.findAll({ raw: true });
    console.log("requesting all images");
    res.send(allImages);
  } catch (e) {
    console.log(`Oopsie daisy, this aint working. Here's the message: ${e}`);
  }
});
//one
router.get("/one", async (req, res) => {
  try {
    const oneImage = await Image.findOne({ where: { title: "kitten" } });
    if (Image === null) {
      res.status(404).send("Not found!");
    } else {
      res.send(oneImage);
    }
  } catch (e) {
    console.log(`Something went wrong :< Here's the message: ${e}`);
  }
});
router.get("/auth/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]); //should be user.id
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

//post requests
router.post("/create", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("Missing parameters");
    } else {
      const newImage = await Image.create({
        title,
        url,
      });
      res.json(newImage);
    }
  } catch (e) {
    next(e);
  }
});
//export
module.exports = router;
