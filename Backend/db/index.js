const mongoose = require('mongoose');
const dbConfig = require('../db.config'); // Import config

mongoose
    .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true }) // Use config URL
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;
