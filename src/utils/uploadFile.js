const multer = require('multer');
const fs = require('fs');
module.exports = (req, res, next) => {
  
    const dir = './public/uploads/';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
         
            cb(null, './public/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({ storage: storage }).fields([{ name: 'myFiles', maxCount: 8 }])
    upload(req, res, function (err) {
  
        if (err instanceof multer.MulterError) {
            res.json(err)
            return
        } else if (err) {
            res.json(err)
            return
        }
        next()
    })
   
}