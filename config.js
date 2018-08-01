
// import fs module
const fs = require('fs');

var DoStuff = function (cb) {
    
    this.readFile = () => fs.readFile("./random.txt", "utf8", (err, data) => {
        if (err) throw err;
        cb(data.split(','));
    });
}

module.exports = DoStuff;