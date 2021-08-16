# mongo_news 

This software is a site scraper for the New York Times. Instead of using an API, I have created a program that will scan for new Div's, Headlines, and articles to determine what is a story. It then takes that story, and reformats it so to only include headlines and summery information, when available. It then adds bold text where appropriate, creates a link to the original story, and posts that story at this private website. To make this possible I have built the site using node.js, utilized MongoDB (a NoSQL database program), while taking advantage of Cheerio's parsing library to make things a little simpler, and finally express and express-handlebars to handle internal routing.


# Prerequisites

* Node.js
* MongoDB


# Dependencies

* express
* express-handlebars
* mongoose
* request
* cheerio
* body-parser
* API calls


# Command line Directions:

1. cd into this file

2. npm install

3. node server.js
	(You should see a message saying: "App running on port 4127!")

4. in the browser's searchbar, type: 127.0.0.1:4127
