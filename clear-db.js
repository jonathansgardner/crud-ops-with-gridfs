// This file clears the Mongo Database
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true })
  .then(
    () => console.log("connected to the database"),
    err => console.error.bind(console, "database connection error:")
  );
mongoose.connection.dropDatabase( () => {
  process.exit();
});
