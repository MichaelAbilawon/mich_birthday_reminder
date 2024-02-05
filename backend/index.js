const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./controller/register");
const scheduler = require("./scheduler");
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
//Middleware and Routers
app.use(express.json());
app.use("/register", router);
//Server listening on port
app.listen(3007, () => console.log("Server is connected successfully"));
