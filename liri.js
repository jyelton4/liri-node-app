
// import dotenv npm package
const dotenv = require("dotenv").config();

// import custom modules 
const Twitter = require("./twitter.js");
const Spotify = require("./spotify.js");
const News = require("./news-api.js");
const OMDb = require("./omdb.js");
const Logger = require("./logger.js");
const Config = require("./config.js");

// instance of Logger constructor
var logger = new Logger();

// cmd line args
var mod = process.argv[2];
var term = process.argv.slice(3).join("+");

// do-what-it-says handler, can use config.js to run any module/term
// CODE REVIEW: This could just be another in runLiri  node liri from-file ./random.txt
if (mod === "do-what-it-says") {
    var config = new Config (function(val) { 
        runLIRI(val[0], val[1]);
    })
    config.readFile();
} else {
    runLIRI(mod,term);
};

// CODE REVIEW: argument names could be more descriptive
// runLIRI function
function runLIRI(arg1, arg2) {
    if (arg1 === "my-tweets") {
    var twitter = new Twitter(logger.writeToLog);
    twitter.findTweets();
    } else if (arg1 === "spotify-this-song") {
        var spotify = new Spotify(logger.writeToLog);
        if (arg2) {
            spotify.search(arg2);
        } else {
            spotify.request("0hrBpAOgrt8RXigk83LLNE");
        }
    } else if (arg1 === "my-news") {
        var news = new News(logger.writeToLog);
        news.findNews();
    } else if (arg1 === "movie-this") {
        var omdb = new OMDb(logger.writeToLog);
        if (arg2) {
            omdb.findMovie(arg2);
        } else {
            omdb.findMovie("Mr. Nobody");
        }
    }
};