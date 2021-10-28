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

//export
module.exports = router;
