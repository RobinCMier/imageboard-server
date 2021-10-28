const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();
//RPC => remote procedure call. Doesn't do DB but does things remotely
// It is POST because delete and get request DONT CARRY A BODY. Post makes most sense
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      //you could also log in with user, same story
      res.status(400).send({
        message: "Please enter an email and a password",
      });
    } else {
      //find user by email to check if email exists
      //findAll works but returns an array not an object and is also slower
      const user = await User.findOne({
        where: { email: email },
      }); // did I find? if no "not found" if yes proceed:
      if (!user) {
        res.status(404).send({
          message: "user with that email does not exist",
        });
      }
      // check if password in body equals to user.pw, if no error.
      else if (bcrypt.compareSync(password, user.password)) {
        const data = { userId: user.id }; //creating it with user.id
        const token = toJWT(data); //attaching token to user.id
        res.send({ message: "Grats! U logged in", token, data }); //give token to user
      } else {
        res.status(400).send({
          message: "Password was incorrect",
        });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
