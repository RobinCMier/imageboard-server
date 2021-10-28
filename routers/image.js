// import stuff
const { Router } = require("express");
const Image = require("../models").image;

//define routes
const router = new Router();
//basepage
router.get("/", (req, res) => res.send("Welcome to imagepage!"));
//get requests
router.get("/all", async (req, res) => {
  try {
    const allImages = await Image.findAll({ raw: true });
    console.log("requesting all images");
    res.send(allImages);
  } catch (e) {
    console.log(`Oopsie daisy, this aint working. Here's the message: ${e}`);
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
