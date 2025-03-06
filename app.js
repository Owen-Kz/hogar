const express = require("express")
const dotenv = require("dotenv").config();
const app =  express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 31000;
const server = require("http").Server(app)
const path = require("path")
// const session = require("express-session");
const session = require('express-session');
const bodyParser = require("body-parser");
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
})); 

app.use(bodyParser.json({ limit: '100mb' })); // For JSON payloads
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookie());
 // For URL-encoded forms
app.use(express.json({ limit: '100mb' })); // For JSON bodies
app.use(express.urlencoded({ limit: '100mb', extended: true })); // For URL-encoded bodies
 

// Set the view engine
app.set("view engine", "ejs");

// Ensure Express knows where to find the views
app.set("views", path.join(__dirname, "views")); 

app.use("/css", express.static(__dirname + "/public/css", { type: 'text/css' }))
app.use("/js", express.static(__dirname + "/public/js", { type: 'text/javascript' }))
app.use("/vendor", express.static(__dirname + "/public/js/vendor", {type: 'text/javacript'}))
app.use("/images", express.static(__dirname + "/public/images", { type: 'text/folder' }))
app.use("/uploads", express.static(__dirname + "/public/uploads/cover_images/listings", { type: 'text/folder' }))
app.use("/fonts", express.static(__dirname + "/public/fonts", { type: 'text/folder' }))
// app.use("/bootstrap", express.static(__dirname + "/public/bootstrap", { type: 'text/folder' }))




app.use("/", require(__dirname +"./routes/pages"));

server.listen(PORT); 
console.log("Server is running on", PORT)