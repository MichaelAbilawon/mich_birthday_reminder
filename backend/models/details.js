const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  dateOfBirth: {
    required: true,
    type: String, // Store as string to match frontend format
    set: function (value) {
      // Custom setter to ensure date format matches frontend
      return new Date(value).toISOString().split("T")[0];
    },
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
