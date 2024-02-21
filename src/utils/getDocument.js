const fs = require("fs");
module.exports = (pathName) => {
   
    return fs.readFileSync(pathName, 'utf8', (err) => {
        if (err) {
            throw err;
        }
    });
   
}