const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const keys = require("./config/keys");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Middleware
app.use( bodyParser.json() );
app.use( methodOverride('_method') );

const fileRouter = require("./routes/fileRouter");
app.use('/files', fileRouter);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(keys.PORT, () => console.log(`server started on port ${keys.PORT}`));
