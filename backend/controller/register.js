const express = require("express");
const router = express.Router();
const user = require("../models/details");
const validateRegistration = require("../middleware/joischema");
const winston = require("./logger");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", validateRegistration, async (req, res) => {
  console.log(req.body);
  try {
    const isExisting = await user.findOne({ email: req.body.email });
    if (isExisting) {
      return res.render("error");
    }
    const { username, email, dateOfBirth } = req.body;
    // Create a new user
    const newUser = new user({
      username,
      email,
      dateOfBirth,
    });
    // Save the user to the database
    await newUser.save();

    // Redirect or send a response as needed
    // res.send("User registered successfully!");
    res.render("success", { user: newUser });
    winston.info(`New User Created - ${username}`);
  } catch (error) {
    // Log the error
    winston.error(`Error registering user: ${error.message}`);
    // Send an error response
    res.status(500).send({ error: "Registration failed" });
  }
});

module.exports = router;
