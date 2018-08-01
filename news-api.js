
// import request npm package
const request = require("request");

// create NewsAPI service
const News = function (cb) {

    this.url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=9e7f73e9067647ea9aecfd3ed32af57d";

    this.findNews = () => request(this.url, (err, response, body) => {
    if (err) throw err;
    var articles = JSON.parse(body).articles;
    articles.forEach(function(item) {
        var logData = [
            "Title: " + item.title, 
            "Author: " + item.author, 
            "Published: " + item.publishedAt.slice(0,10), 
            "Link: " + item.url
        ].join("\n");
        console.log(logData);
        cb("./log.txt", logData);
        })
    })
};

module.exports = News;