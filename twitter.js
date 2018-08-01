
// import keys module
const keys = require("./keys.js");

// import twitter npm package
const Twitter = require("twitter");

// create spotify and twitter services
const twitter = new Twitter(keys.twitter);

// my-tweets
var TwitterSearch = function () {

    this.params = {screen_name: 'nodejs'};

    this.findTweets = () => {
        twitter.get("statuses/user_timeline", this.params, (err, tweets, response) => {
            if (err) throw err;
            console.log(tweets);
            // cb(logData);
        });
    }
};

module.exports = TwitterSearch;