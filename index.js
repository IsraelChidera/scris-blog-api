const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./middleware/logger');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/posts', require('./routes/posts'));

