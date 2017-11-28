var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var router = express.Router();

// Routes

// A GET route for scraping nbcNews website
app.get("/scrape", function(req, res) {
  // getting the body of the html with request
  axios.get("https://www.nbcnews.com/").then(function(response) {
    // load into cheerio and save it to $ for a shorthand selector
    // basicly, I can 'sort of' use jQuery now
    var $ = cheerio.load(response.data);

    // getting every h3 within an js-top-stories-content tag
    // js-top-stories-content		This is the web class that I want to grab from
   
    // getting every h3 within article tag
    // note: .each(function(2 arguements){})
    $("js-top-stories-content h3").each(function(i, element) {
 		// object
      	var result = {};

    	// Add text and href of EVERY LINK
    	// save them as properties of the result object
    	// .children("a") is the links I'm grabbing
    	result.title = $(this)
    		.children("a")
        	.text();
    	result.link = $(this)
       		.children("a")
        	.attr("href");

    	// Create a new Article from the `result` object
    	db.Article
        	.create(result)
        	.then(function(dbArticle) {
        // send a message to the client
        	res.send("Articles Found");
        })
        .catch(function(err) {
        // If err send to client
          res.json(err);
        });
    });
  });
});

// Route for getting all Articles from the db
// db location : models
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
	db.Article
    	.find({})
    	.then(function(dbArticle) {
    		// If able to find Articles, send them back to the client
      		res.json(dbArticle);
    	})
    	.catch(function(err) {
    	// this will throw the err back to the client
      		res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  	// Using the id passed in the id parameter, prepare a query that finds the matching id in db.
	db.Article
    .findOne({ _id: req.params.id })
    // populate all of the notes associated with the id
    .populate("note")
    .then(function(dbArticle) {
  	// If unable to find it let the client know
      res.json(dbArticle);
    })
    .catch(function(err) {
    // If err, send err to client
    	res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
// Create a new note
// pass the req.body to the entry
  	db.Note
    	.create(req.body)
    	.then(function(dbNote) {
    	// find one Article with an `_id` equal to `req.params.id`. Update Article with the new Note
    	// { new: true } tells the query to return the updated User -- it returns the original by default
    	// mongoose query returns a promise `.then` receives the result of the query
     	return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
    	// send an updated artical to the client
    	res.json(dbArticle);
    })
    .catch(function(err) {
    	// If err send to client
    	res.json(err);
    });
});


// Export routes for server.js
module.exports = router;