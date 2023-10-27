var express = require("express");
var router = express.Router();
const User = require("../model/userModel");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
