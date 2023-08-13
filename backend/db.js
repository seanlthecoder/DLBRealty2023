const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./index");
var connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // console.log("Connected to Database! " + " via " + connectionString);
});
