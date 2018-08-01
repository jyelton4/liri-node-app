
// import fs module
const fs = require('fs');

var Logger = function () {

    this.divider = "\n************************************************************\n\n";
    
    this.writeToLog = (path, data) => fs.appendFile(path, data + this.divider, (err) => {
        if (err) throw err;
    })
}

module.exports = Logger;