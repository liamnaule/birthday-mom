require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { initDatabase } = require('./init-db');
const messages = require('./messages');


// Initialize database on startup
initDatabase();


const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : [];

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
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