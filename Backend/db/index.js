require("dotenv").config();
const mongoose = require("mongoose");
const dbConfig = require("../db.config");

mongoose
    .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;
