var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

var port = process.env.PORT || 3000;

var app = express();

var db = require("./models");

// middlewear config
// Use morgan logger for logging requests
app.use(logger("dev"));

// express.static to make public folder a static directory
app.use(express.static("public"));

// body-parser for handling form submissions
// extended : false			This means I can't post nested objects.
app.use(bodyParser.urlencoded({ extended: false }));

// setting up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controlers/nbcNews.js");

app.use("/", routes);

app.listen(port);

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost@ds040877.mlab.com:40877/national_news_test", {
  useMongoClient: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});