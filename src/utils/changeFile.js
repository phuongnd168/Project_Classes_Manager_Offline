var fs = require('fs')
module.exports = (pathName, newData) => {
    fs.readFile(pathName, 'utf8', function (err,data) {
        if (err) {
          return
        }
        var result = data.replace(data, newData);
      
        fs.writeFile(pathName, result, 'utf8', function (err) {
           if (err) return 
        });
    });
}
