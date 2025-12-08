// backend/db.js
const Database = require('better-sqlite3');
const path = require('path');


const db = new Database(path.join(__dirname, 'messages.db'));


// Create table
db.prepare(`
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
message TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();


module.exports = db;