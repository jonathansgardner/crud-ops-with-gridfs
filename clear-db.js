var conn = require('./db');

conn.uploads.chunks.drop();
conn.uploads.files.drop();
