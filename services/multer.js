const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const keys = require("../config/keys");

// Create Storage Engine
const storage = new GridFsStorage({
  url: keys.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      //this create a unique 16 character string
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' //should match gfs.collection
        };
        resolve(fileInfo);
      });
      /* To manually choose a filename - can remove crypto from require statements
      const filename = '[insert whatever]' + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads' //should match gfs.collection
      };
      resolve(fileInfo);
      */
    });
  }
});
const upload = multer({ storage });

module.exports = upload;
