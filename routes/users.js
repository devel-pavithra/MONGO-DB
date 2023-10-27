var express = require("express");
var router = express.Router();
const User = require("../model/userModel");

router.get("/", function (req, res, next) {
  try {
    User.find({})
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
});

router.get("/fetchuser/:id", function (req, res, next) {
  try {
    const ID = req.params.id;
    User.findOne({ _id: ID })
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteuser/:id", function (req, res, next) {
  try {
    const ID = req.params.id;
    User.deleteOne({ _id: ID })
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
