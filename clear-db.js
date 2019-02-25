// This file clears the Mongo Database
const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.db.dropDatabase();
