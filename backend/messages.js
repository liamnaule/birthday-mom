// backend/messages.js
const express = require('express');
const router = express.Router();
const db = require('./db');


// GET all messages
router.get('/', (req, res) => {
try {
const stmt = db.prepare('SELECT id, name, message, created_at FROM messages ORDER BY created_at DESC');
const messages = stmt.all();
res.json(messages);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


// POST a new message
router.post('/', (req, res) => {
try {
const { name, message } = req.body;
if (!name || !message) return res.status(400).json({ error: 'Name and message are required' });


const stmt = db.prepare('INSERT INTO messages (name, message) VALUES (?, ?)');
const info = stmt.run(name.trim(), message.trim());


res.json({ success: true, id: info.lastInsertRowid });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;