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
  dateofbirth: {
    required: true,
    type: Date,
  },
  dateSelected: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  const currentDate = new Date().toLocaleDateString(undefined, {
    month: "2-digit",
    day: "2-digit",
  });
  this.dateSelected = currentDate;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
