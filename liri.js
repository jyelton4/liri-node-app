
// import dotenv npm package
const dotenv = require("dotenv").config();

// import request npm package
const request = require("request");

// import node-spotify-api npm package
const Spotify = require("node-spotify-api");

// import twitter npm package
const Twitter = require("twitter");

// import keys module
const keys = require("./keys.js");

// import fs module
const fs = require('fs');

// create spotify and twitter services
const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);

// create NewsAPI service
const newsAPI = () => {
    request(newsUrl, (err, response, body) => {
    if (err) throw err;
    console.log(response);
    })
};

// create OMDb API service 
const oMDb = (requestUrl) => request(omdbUrl + requestUrl, (err, response, body) => {
    if (requestUrl) {
        if (err) throw err;
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
        console.log("Production: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    } else {
        request("http://www.omdbapi.com/?apikey=813b8ce9&t=mr+nobody", (err, response, body) => {
            if (err) throw err;
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        })
    }
});

// base OMDb url
var omdbUrl = "http://www.omdbapi.com/?apikey=813b8ce9&t=";

// base NewsAPI url
var newsUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=9e7f73e9067647ea9aecfd3ed32af57d";

// spotify-this-song
function spotifySearch (song) {
    if (song) {
    spotify.search({ type: "track", query: song}, (err,data) => {
    if (err) throw err;
    var artist = data.tracks.items[0].album.artists[0].name;
    var link = data.tracks.items[0].album.artists[0].external_urls.spotify;
    var album = data.tracks.items[0].album.name;
    console.log(artist + "\n" + link + "\n" + album);
    });
    } else {
        spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
        .then(function(data) {
            var artist = data.artists[0].name;
            var link = data.artists[0].external_urls.spotify;
            var album = data.album.name;
            console.log(artist + "\n" + link + "\n" + album);
        })
    };
}

// my-tweets
// function tweeterCall () {
//     var params = {screen_name: 'nodejs'};
//     twitter.get("statuses/user_timeline", params, (err, tweets, response) => {
//         if (err) throw err;
//         console.log(tweets);
//     });
// };

// do-what-it-says
const readTextFileFunc = () => fs.readFile("./random.txt", "utf8", (err,data) => {
    if (err) throw err;
    var contents = data.split(',');
    programsObj[contents[0]](contents[1]);
});

//
var programsObj = {
    "spotify-this-song": spotifySearch, 
    // "my-tweets": tweeterCall, 
    "movie-this": oMDb, 
    "my-news": newsAPI, 
    "do-what-it-says": readTextFileFunc
}

// cmd line args
var program = process.argv[2];
var arg = process.argv[3];

//
programsObj[program](arg);