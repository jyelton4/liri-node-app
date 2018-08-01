
// import keys module
const keys = require("./keys.js");

// import node-spotify-api npm package
const Spotify = require("node-spotify-api");

// create spotify service
const spotify = new Spotify(keys.spotify);

var SpotifySearch = function (cb) {

    this.url = "https://api.spotify.com/v1/tracks/";

    this.search = (track) => spotify.search({ type: "track", query: track }, (err, data) => {
        if (err) throw err;
        var jsonData = data.tracks.items[0];
        var logData = [
            "Artist: " + jsonData.album.artists[0].name, 
            "Track: " + jsonData.name, 
            "Spotify Link: " + jsonData.album.artists[0].external_urls.spotify, 
            "Album: " + jsonData.album.name 
        ].join("\n");
        console.log(logData);
        cb("./log.txt", logData);
    });

    this.request = (uri) => spotify.request(this.url + uri)
        .then(function(data) {
            var logData = [
                "Artist: " + data.artists[0].name,
                "Spotify Link: " + data.artists[0].external_urls.spotify, 
                "Album: " + data.album.name
            ].join("\n");
            console.log(logData);
            cb("./log.txt", logData);
        })
};

module.exports = SpotifySearch;