const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
  }
}
connectToDatabase();

//Server listening on port
app.listen(3000, () => console.log("Server is connected successfully"));
