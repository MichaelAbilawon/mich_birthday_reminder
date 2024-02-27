const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./controller/register");
const path = require("path");
const winston = require("winston");
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
app.use(express.urlencoded({ extended: true }));

app.use("/register", router);
app.set(express.static("public"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views")); //directory for views
app.get("/", (req, res) => {
  res.render("register");
});

//Server listening on port
app.listen(3007, () => console.log("Server is connected successfully"));
