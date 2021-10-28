const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        message: "Please enter an email and a password",
      });
    } else {
      res.send({
        jwt: toJWT({ userId: 1 }),
      });
    }
  } catch (e) {
    next(e);
  }
  // Here goes the login logic.
});

module.exports = router;
