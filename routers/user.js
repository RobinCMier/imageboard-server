// import stuff
const { Router, response } = require("express");
const User = require("../models").user;

//define routes
const router = new Router();
//basepage
router.get("/", (req, res) => res.send("Welcome to userpage!"));
//get requests
router.get("/all", async (req, res) => {
  try {
    const allUsers = await User.findAll({ raw: true });
    console.log("requesting all users");
    res.send(allUsers);
  } catch (e) {
    console.log(`Oopsie daisy, this aint working. Here's the message: ${e}`);
  }
});

//post requests
router.post("/create", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const newUser = await User.create({
        email,
        passeord,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

//export
module.exports = router;
