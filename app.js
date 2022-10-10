const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var cors = require("cors");

dotenv.config({ path: "./config.env" });

require("./db/conn");
// const User = require('./model/userSchema');

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

// Middelware
const middleware = (req, res, next) => {
  console.log(`Hello my Middleware`);
  next();
};
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static(path.join(__dirname, "client/build/static/")));

// app.get("/app-ads.txt", (req, res) => {
//   console.log("ads");
//   const filePath = path.join(__dirname, "client/build/static/app-ads.txt");
//   console.log(filePath);
//   res.sendFile(filePath);
// });

app.get("/*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
    // app.use(express.static("cilent/build"));
    // const path = require("path");

    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  }
});

app.get("/about", middleware, (req, res) => {
  console.log(`Hello my About`);
  res.send(`Hello About world from the server`);
});

// we link the router files to make our route easy
app.use(require("./router/auth"));
app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
