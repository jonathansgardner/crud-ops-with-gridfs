const mongoose = require('mongoose');
const keys = require("./config/keys");

// Create Mongo connection
const conn = mongoose.createConnection(keys.MONGO_URI, { useNewUrlParser: true });
conn.on("error", console.error.bind(console, "database connection error:"));
conn.once("open", () => console.log("connected to the database."));

module.exports = conn;
