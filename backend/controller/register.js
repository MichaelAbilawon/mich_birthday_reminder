const express = require("express");
const router = express.Router();
const user = require("../models/details");

//Registration Routes
router.post("/register", validateRegistration, async (req, res) => {
  try {
    //Data is already validated and available as req.body
    const { username, email, dateOfBirth } = req.body;

    //Create a new user
    const newUser = new user({
      username,
      email,
      dateOfBirth,
    });

    //Save the user to the database

    await newUser.save();

    //Redirect or send a response as needed

    res.status(201).send(`${req.body.username} registered successfully`);
  } catch (error) {
    console.error("Error registering user:" + error.message);
    res.status(500).send("Internal Serval Error");
  }
});

module.exports = router;