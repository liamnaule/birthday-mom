// backend/index.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const messages = require('./messages');


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());


// Rate limiting (simple)
app.use(rateLimit({
windowMs: 60 * 1000, // 1 minute
max: 30, // limit each IP to 30 requests per windowMs
}));


// Routes
app.use('/api/messages', messages);


// Health
app.get('/', (req, res) => res.json({ ok: true }));


app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));