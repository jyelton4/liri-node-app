
// import request npm package
const request = require("request");

// OMDb API call constructor
const OMDb = function (cb) {
    
    this.url = "http://www.omdbapi.com/?apikey=813b8ce9&t=";

    this.findMovie = (movie) => request(this.url + movie, (err, response, body) => {
        if (err) throw err;
        var jsonData = JSON.parse(body);
        var logData = [
            "Title: " + jsonData.Title, 
            "Year: " + jsonData.Year, 
            "IMDb Rating: " + jsonData.imdbRating, 
            "Rotten Tomatoes Rating: " + jsonData.Ratings[2].Value, 
            "Production: " + jsonData.Country, 
            "Language: " + jsonData.Language, 
            "Plot: " + jsonData.Plot, 
            "Actors: " + jsonData.Actors
            ].join("\n");
        console.log(logData);
        cb("./log.txt", logData);
    })
};

module.exports = OMDb;