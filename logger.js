
// import fs module
const fs = require('fs');

// CODE REVIEW: consider constructing a logger with the filepath of the log file, rather than passing it in everywhere.
// similarly an argument to indicate the data should be also logged to the console would allow
// the duplication of logging code throughout the application to be here in one configurable place.
var Logger = function () {

    this.divider = "\n************************************************************\n\n";
    
    this.writeToLog = (path, data) => fs.appendFile(path, data + this.divider, (err) => {
        if (err) throw err;
    })
}

module.exports = Logger;