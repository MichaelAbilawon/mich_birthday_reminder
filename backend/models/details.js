const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true, //this is to make sure that the email id of a person is always
    //unique in our database
  },
});
