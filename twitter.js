
// import keys module
const keys = require("./keys.js");

// import twitter npm package
const Twitter = require("twitter");

// create spotify and twitter services
const twitter = new Twitter(keys.twitter);

// my-tweets
var TwitterSearch = function (cb) {

    this.params = {screen_name: 'AlbertEllingwo1'};

    this.findTweets = () => {
        twitter.get("statuses/user_timeline", this.params, (err, tweets, response) => {
            if (err) throw err;
            tweets.forEach(function(item) {
                var logData = [
                    "Tweet: " + item.text, 
                    "Tweeted: " + item.created_at.slice(0,20)
                ].join("\n");
                console.log(logData);
                cb("./log.txt", logData);
            })
        });
    }
};

module.exports = TwitterSearch;