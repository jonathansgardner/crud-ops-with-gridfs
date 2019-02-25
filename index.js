const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const keys = require("./config/keys");

// Connect to MongoDB
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true })
  .then(
    () => console.log("connected to the database"),
    err => console.error.bind(console, "database connection error:")
  );

// Create express app
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Use Express middleware
app.use( bodyParser.json() );
app.use( methodOverride('_method') );

// Include files router
const fileRouter = require("./routes/fileRouter");
app.use('/files', fileRouter);

// Handle any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(keys.PORT, () => console.log(`server started on port ${keys.PORT}`));
