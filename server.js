const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api/auth', authRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({
        status: 'UP',
        message: 'ShoeSure API Server is running smoothly',
        timestamp: new Date()
    });
});

// Root Route fallback to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB Connection & Server Startup
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shoesure';

console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB database successfully');
        app.listen(PORT, () => {
            console.log(`🚀 ShoeSure Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️ Starting Express server in fallback mode...');
        app.listen(PORT, () => {
            console.log(`🚀 ShoeSure Server running on http://localhost:${PORT} (Waiting for MongoDB)`);
        });
    });
