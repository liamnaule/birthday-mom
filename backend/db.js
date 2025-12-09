// backend/db.js
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbPath = path.join(__dirname, 'messages.db');

const enableVerbose = process.env.LOG_SQL === 'true';

// Create database connection with persistence settings
// The database file will persist permanently in the backend directory
const db = new Database(dbPath, {
  verbose: enableVerbose ? console.log : null
});

// Enable WAL mode for better concurrency and data safety
db.pragma('journal_mode = WAL');

// Create table if it doesn't exist
// This table persists data permanently to messages.db file
db.prepare(`
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

// Ensure database file is writable
try {
  fs.accessSync(dbPath, fs.constants.W_OK);
  console.log('Database file is writable:', dbPath);
} catch (err) {
  console.warn('Database file may not be writable:', err.message);
}

module.exports = db;