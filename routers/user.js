// import stuff
const { Router, response } = require("express");
const User = require("../models").user;
const bcrypt = require("bcrypt");
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
      //this is also a place you can add a const hashedPassword rather than put it in one line
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10), //how many times are you gonna shuffle. Don't worry about it for now
        fullName,
      });
      res.json(newUser);
      //alt: response.send({message: "new user created", etc})
    }
  } catch (e) {
    next(e);
  }
});

/*line 27-31 may also be written like so: 
const newUser = await User.create(req.body);
because you declare all parameters in const req.body already. 

*/
//export
module.exports = router;
