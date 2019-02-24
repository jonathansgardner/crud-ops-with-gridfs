const express = require("express");
const router = express.Router();
const upload = require('../services/multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const conn = require('../db');

// Initialize gfs
let gfs;

// Initialize gfs stream
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// @route GET /files
// @desc Gets all files in json format
router.get('/', (req, res) => {
  gfs.files.find().toArray( (err, files) => {
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc Displays a specific files in json format
router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if there's a file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'That file doesn\'t exist'
      });
    }

    // If file exists
    return res.json(file);
  });
});

// @route POST /files/upload
// @desc Uploads a file to the DB
router.post('/upload', upload.single('file'), (req, res) => {
  gfs.files.update({ _id: req.file.id }, { $set: { metadata: {caption: req.file.filename, alt: req.file.filename } } }, (err, file) => {
    gfs.files.findOne({ filename: req.file.filename }, (err, file) => {
      return res.json(file)
    });
  });
});

// @route PUT /files/update/:fileName
// @desc Updates the metadata of the file
router.patch('/update/:filename', (req, res) => {
  gfs.files.update({ filename: req.params.filename }, { $set: { metadata: {caption: req.body.caption, alt: req.body.alt } } }, (err, file) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      return res.json(file)
    });
  });
})

// @route DELETE /files/delete/:fileName
// @desc Deletes a specific file by filename
router.delete('/delete/:filename', (req, res) => {
  gfs.remove({ filename: req.params.filename, root: 'uploads' }, err => {
    if (err) {
      return res.status(404).json({
        err: `${req.params.filename} was not deleted`
      });
    }
    res.json(req.params.filename);
  });
});

// @route GET files/read/:filename
// @desc Displays a specific file
router.get('/read/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if there's a file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'That file doesn\'t exist'
      });
    }

    // If file exists...
    // Check if it's an image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read Grid FS output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

module.exports = router;
