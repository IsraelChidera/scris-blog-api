const express = require('express');
const config = require('config');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const seedAdmin = require('./scripts/seed');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

if (!config.get('jwtSecret')) {
    console.error('FATAL ERROR: JWT SECRET is not defined.');
    process.exit(1);
}

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// health check
app.get("/api/health", (_req, res) => {
    res.send("Working . . .");
})

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});


mongoose.connect(config.get('mongoURI'))
    .then(async () => {
        console.log('Connected to MongoDB');
        await seedAdmin();
        app.listen(config.get('port'), () => {
            console.log(`Server running on port ${config.get('port')}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });
